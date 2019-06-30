
const functions = require('firebase-functions');

const data = require('./firestore');

const express = require('express');
const app = express();

app.get('/getquestions', (req, res) => {
    res.send(data.getQuestions());
});

app.get('/api/test', (req, res) => {
    res.send('Test');
});

exports.app = functions.https.onRequest(app);