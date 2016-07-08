"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const firebase = require('firebase');

firebase.initializeApp({
  apiKey: "AIzaSyAZPHuMoKrlNOvY6bszaBX4yrityBrsHaw",
  authDomain: "todo-dss-520b0.firebaseapp.com",
  databaseURL: "https://todo-dss-520b0.firebaseio.com",
  storageBucket: ""
});

const ref = firebase.database().ref();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.route("/api")
  .get((req,res) => {
    ref.child("todos").on("value", (snapshot) => {
      res.json({"message" : "read OK!",
                "data" : snapshot.val()});
    }, (err) => {
      res.json({"message" : "error: " + err});
    });
  })
  .post((req, res) => {
    ref.child("todos").push(req.body)
      .then(() => {
        res.json({"message" : "write OK!",
                  "data" : req.body});
      }, (err) => {
        res.json({"message" : "error: " + err});
      });
  })
  .put((req, res) => {
    let thisRecord = ref.child("todos").child(req.query.key);
    let flag = req.query.isDone === "true" ? true : false;
    thisRecord.update({isDone: flag}, (err) => {
      if (!err) {
        res.json({"message" : "update OK!",
                  "data" : flag});
      } else {
        res.json({"message" : "error: " + err});
      }
    });
  });

app.use('/', router);

app.listen(8080);
console.log("Listening on port 8080");