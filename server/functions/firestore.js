const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getQuestions = function() {
    return db.collection("/questions").get().then((querySnapshot) => {
        const stuff = [];
        querySnapshot.forEach((doc) => {
            stuff.push(doc.data());
        });
        return stuff;
    }).catch((e)=>{
        return e;
    });
}