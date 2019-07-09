
const functions = require('firebase-functions');

const data = require('./appdatabase');

const express = require('express');
const app = express();

app.get('/getquestions', async (req, res) => {
    var result = await data.getQuestions();
    res.send(result);
});

app.get('/api/test', (req, res) => {
    res.send('Test');
});

exports.app = functions.https.onRequest(app);