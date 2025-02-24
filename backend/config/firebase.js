const admin = require('firebase-admin');
require('dotenv').config();

// Check if Firebase is already initialized to avoid duplicate app errors
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "ipayon-aaa7e",
      private_key_id: "b24d0ca456940efdef8f37a135c4e0e77a1b7699",
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Handle escaped newlines
      client_email: "firebase-adminsdk-fbsvc@ipayon-aaa7e.iam.gserviceaccount.com",
      client_id: "107599761060546800892",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ipayon-aaa7e.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
    // databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

// Export the existing app instead of reinitializing it
// module.exports = admin;
exports.db = admin.firestore();

