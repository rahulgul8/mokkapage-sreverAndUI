
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getQuestions = async function () {
    var stuff = [];
    try {
        var data = await db.collection("questions").get();
        data.forEach((doc) => {
            stuff.push(doc.data());
        });
    } catch (e) {
        return e;
    }
    return stuff;
}