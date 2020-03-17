// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyA6YtYIdMmMTmvaJUuKm4AAPR7p9Jc-QWg',
    authDomain: 'bibo-app.firebaseapp.com',
    databaseURL: 'https://bibo-app.firebaseio.com',
    projectId: 'bibo-app',
    storageBucket: 'bibo-app.appspot.com',
    messagingSenderId: '464799081519',
    appId: '1:464799081519:web:2302b35e140f29c81ad2da',
  },
};

export const googleApisConfig = {
  clientId:
    '464799081519-l3ulfruicd66n5up81l0l8a1oupokohf.apps.googleusercontent.com',
  clientSecret: 'XPyrxg9CnEevQzM6P9YGSuJ9',
  redirectURI: 'https://bibo-app.firebaseapp.com/__/auth/handler',
  apiKey: 'AIzaSyC1L6kFMqGFCDPJIbet7AzHy3etd1lz_zY',
};

export const awsS3Config = {
  aws_access_key_id: 'AKIAVF5MMYD3OPRZ3OBI',
  aws_secret_access_key: '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',
};

export const awsCloudFrontConfig = {
  keypairId: 'APKAJAFOBZSOCJQNQ4LQ',
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEA0RD+8WqFScUzMIFn83jZ59+jMre97WIlFSBkh+v/iq//lZJ3
  GrsULsf9h2oNeqs6V3R1bDL908/c9594+2glnCfwhot0k4i6nQzTDtkikLRFlxrC
  T8+on7A7vnW0MV2AZ+p7sj7lfRdwb1NPbwivdUVJtK7LOuXnVLWcS7yb7iw04DOn
  0O4M14ZrevtMyKkWCk0HDIzk6/mzbW0LxrKTd0uRJUfwBAyj8RUzw+NFYDzKHK7h
  APINN0J2TgdMC2eQvab2PHQDqB/hf5RaB7i9pX7qQ5T89UGOVqU2Y9goKDb6mjEa
  9zq4iNmMBDSRsrYXe6obMT6v0eesoRTg/bEiDwIDAQABAoIBAHkd3oRfkI43Nzuf
  jGhJl/uz3KjSN66hUBhYJsVznBxtb6ToMCYFQWEErUTY1Kw/LFJj/m7Lb69Y2Yt/
  EKidIkTAAqD/g27BJFM9jbwpYNPyC+rJLs7r36V7hHEHYXfD0lLhTf3qYCrC/HkS
  C4+ouXU3ycZqCQS7EfRKLhzWTIOCfXqi09yCnFxLEt+a+cxrT6KsRh83EdkS0bt/
  QWRYISuqH5RU1kuXtLf303MJDQFHVx2hNAtQcAShZozIN6YBx8hBW2lxtUadzus5
  MwwpHF89reoqVootyZLRrX5hmQBuZID4AtdNdNG4wCzIhjaHLXybf9x4QppvZVD7
  U10TitECgYEA/f9fUjm8jBDK/75CzwoTgp332EPy8gDVtZfDZu1S+ANQATnZ2yoG
  TvJ+juKZ+YJ/i3sOXS7WQqOGr7dwjoQNFupfOQPA5L8SrkvsE4E3Vqw88lksA4V7
  GbhPE7LfBKqk90ySiSEi+kENfWxOlHqJ9uBSfdP2Y+dS1JlVj62Mv0kCgYEA0rbx
  FPPsKXj1eyjva9VMuHzmcSs9LrR+Rw7lD7QOTOG9Ai9hTnqFapEK/IrzDpYYgtqr
  B2vVAs+LjreOMccvA40pd3g4yjTWwznAflGdXFFdOmSZegC9ss1kXgNeS/d7f92I
  NlDH5vU8VJJ8bOzjNHqeug4FbAbw82cvloRz3pcCgYEA5nzptAT+qx/GBqNRnu1m
  3P2aXd7zRFYrmFj6kZlE1Bi1bhdgMXiGNvfojqLk1L1uHlVxqG+LMPeRjjzpX/pG
  oofWFzfnv+v/+Liepuh4Hie4OrdesGddWO6em6KSrHpprpwG0XeHdQ65PhqdiDFW
  pvfTA6noCaptyMzIDtSPRzkCgYEAgF+SGrjMnSujKshyrNiDaDY30qSMHsM516K8
  bMe+mppAo28oMj60v4rkDZ29nJpXDomX/up0GMVG+cjcaXk3LEu5Ap8MwixU1xV9
  L7gbTZ4IVUXqtwhyiddWGWyl61Q4OltF3Al08EFh4whno5jihxtZTnKyXPERpMit
  ll7VlLsCgYAOyImvD0eMMMZVq5uDqzpilsdspFtcMTqQCu1Z450NQUed3eyjPYem
  Mi7pJuB8jyEPEUqZWa8skKeCTbmz/iX7J7fQ6C9C9p5Q7rg3x+IIvqmS4okTmlDY
  IWjnJtom3iDPakgDFHl04P3yAi7iI7DE+KbFRDjGIBZPwXFUfx7xeg==
  -----END RSA PRIVATE KEY-----
  `,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
