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
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
