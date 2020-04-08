const functions = require('firebase-functions');
const CloudFront = require('aws-sdk/clients/cloudfront');
const algoliasearch = require('algoliasearch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const ALGOLIA_INDEX_NAME = 'bibo_search';

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

const videoDoc = 'videos/{videoId}';
const VIDEO_BUCKET_URL = 'https://video.bibo.trietapps.com';

exports.getVideo = functions.https.onRequest((req, res) => {
  try {
    const cf = new CloudFront.Signer(
      functions.config().cloudfront.key_pair_id,
      functions.config().cloudfront.private_key_id.replace(/\\n/g, '\n')
    );

    res
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', '*');

    res.status(200).send(
      JSON.stringify(
        cf.getSignedUrl({
          url: `${VIDEO_BUCKET_URL}/${req.body.videoId}`,
          expires: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1, // expire after 1 hour
        })
      )
    );
  } catch (err) {
    res.status(404).send(err);
  }
});

exports.onVideoCreated = functions.firestore
  .document(videoDoc)
  .onCreate((snap, context) => {
    const video = snap.data();
    video.objectID = context.params.videoId;

    return index.saveObject(video);
  });

exports.onVideoUpdated = functions.firestore
  .document(videoDoc)
  .onUpdate((change, context) => {
    const video = change.after.data();
    video.objectID = context.params.videoId;

    return index.saveObject(video);
  });

exports.onVideoDeleted = functions.firestore
  .document(videoDoc)
  .onDelete((snap, context) => {
    const objectID = context.params.videoId;

    return index.deleteObject(objectID);
  });
