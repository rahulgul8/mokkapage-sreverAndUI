const Rx = require('rxjs');
const RxOp = require('rxjs/operators');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getQuestions = function() {
    console.log('I was here');
    return db.collection("/questions").get().then((querySnapshot) => {
        const stuff = [];
        querySnapshot.forEach((doc) => {
            stuff.push(doc.data());
        });
        console.log('test');
        return stuff;
    }).catch((e)=>{
        console.log(e);
    });
}