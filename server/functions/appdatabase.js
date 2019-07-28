
const admin = require('firebase-admin');
const serviceAccount = require('./mokka.json');
// admin.initializeApp(functions.config().firebase);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), });
const db = admin.firestore();

exports.getQuestions = async function (lang) {
    var stuff = [];
    try {
        var data = await db.collection("/questions").get();
        data.forEach((doc) => {
            var d = doc.data();
            stuff.push(d);
        });
    } catch (e) {
        return e;
    }
    return stuff;
}

function exportAsArray(options) {
    var list = [];
    options.forEach((value, key) => {
        var v = { value: key, url: value };
        list.push(v);
    });
    return list;
}

exports.addPlayerResponse = async function (response) {
    if (response) {
        return await db.collection("/userResponse").add({
            name: response.name,
            quiz: response.quiz
        });
    } else {
        return false;
    }
}

exports.getPlayerQuiz = async function (id) {
    var ref = await db.collection("/userResponse").doc(id).get();
    if (ref.exists) {
        var data = ref.data();
        return { "quiz": data.quiz, "name": data.name };
    } else {
        return false;
    }
}

exports.getPlayerResult = async function (id) {
    var ref = await db.collection("/userResponse").doc(id).get();
    if (ref.exists) {
        return ref.data().responses;
    } else {
        return false;
    }
}

exports.updateFriendResult = async function (response) {
    var id = response.id;
    var name = response.name;
    var score = response.score;

    if (id) {
        try {
            const document = db.collection('/userResponse').doc(id);
            const frndResp = { name: name, score: score };
            return await db.runTransaction(transaction => {
                // This code may get re-run multiple times if there are conflicts.
                return transaction.get(document).then(reference => {
                    var data = reference.data();
                    if (reference.exists) {
                        var responses;
                        if (!data.responses) {
                            responses = []
                        } else {
                            responses = data.responses;
                        }
                        responses.push(frndResp);
                        transaction.update(document, { responses: responses });
                        return responses;
                    } else {
                        throw new Error('Challege not found');
                    }
                });
            });
        }
        catch (e) {
            return e;
        }
    } else {
        return false;
    }
};
