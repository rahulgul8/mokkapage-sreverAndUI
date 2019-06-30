const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send('Test');
});

app.get('/api/test', (req, res) => {
    res.send('Test');
});

exports.app = functions.https.onRequest(app);