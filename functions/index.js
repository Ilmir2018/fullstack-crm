const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const app = require('../app')

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server has been started ${port}`))

exports.app  = functions.https.onRequest(app)