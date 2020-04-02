const functions = require('firebase-functions');
const CloudFront = require('aws-sdk/clients/cloudfront');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
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
          expires: Math.floor(new Date().getTime() / 1000) + 60 * 60 * 1,
        })
      )
    );
  } catch (err) {
    res.status(404).send(err);
  }
});
