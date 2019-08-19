
const functions = require('firebase-functions');

const dao = require('./appdatabase');
var cors = require('cors');
const express = require('express');
const funapp = express();
funapp.use(cors());

funapp.get('/getquestions', async (req, res) => {
    var result = await dao.getQuestions(req.query.lang);
    res.send(result);
});

funapp.post('/player/response/add', async (req, res) => {
    console.log(req.body)
    var data = await dao.addPlayerResponse(req.body);
    if (data) {
        res.send({ id: data.id });
    }
    else {
        res.send(false);
    }
});

funapp.get('/player/response/get', async (req, res) => {
    var id = req.query.id;
    var result = await dao.getPlayerQuiz(id);
    res.send(result);
});

funapp.post('/player/result/update', async (req, res) => {
    var result = await dao.updateFriendResult(req.body);
    res.send(result);
});

funapp.get('/player/result/get', async (req, res) => {
    var id = req.query.id;
    var result = await dao.getPlayerResult(id);
    res.send(result);
});

exports.app = functions.https.onRequest(funapp);
