const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();

const app = require("./app");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.region("europe-west1").https.onRequest(app);
