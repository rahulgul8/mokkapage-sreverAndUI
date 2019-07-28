
const functions = require('firebase-functions');

const dao = require('./appdatabase');
var cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.get('/getquestions', async (req, res) => {
    var result = await dao.getQuestions(req.query.lang);
    res.send(result);
});

app.post('/player/response/add', async (req, res) => {
    console.log(req.body)
    var data = await dao.addPlayerResponse(req.body);
    if (data) {
        res.send({ id: data.id });
    }
    else {
        res.send(false);
    }
});

app.get('/player/response/get', async (req, res) => {
    var id = req.query.id;
    var result = await dao.getPlayerQuiz(id);
    res.send(result);
});

app.post('/player/result/update', async (req, res) => {
    var result = await dao.updateFriendResult(req.body);
    res.send(result);
});

app.get('/player/result/get', async (req, res) => {
    var id = req.query.id;
    var result = await dao.getPlayerResult(id);
    res.send(result);
});

exports.app = functions.https.onRequest(app);