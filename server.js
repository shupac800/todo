"use strict";

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
var firebase = require('firebase');
//const ToDo = require("./models/ToDo");

//mongoose.connect('mongodb://guest:guest@ds017175.mlab.com:17175/todo');
//mongoose.connect('mongodb://a:a@ds017175.mlab.com:17175/todo');
firebase.initializeApp({
        apiKey: "AIzaSyAZPHuMoKrlNOvY6bszaBX4yrityBrsHaw",
        authDomain: "todo-dss-520b0.firebaseapp.com",
        databaseURL: "https://todo-dss-520b0.firebaseio.com",
        storageBucket: ""
});

var ref = firebase.database().ref();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route("/api")  // route for getAll and post
  .get((req,res) => {
    // ToDo.find('todos',{}, (err, rows) => {
    //   if (err) res.send(err);
    //   res.json(rows);
    // });
    ref.get()
  })
  .post((req, res) => {
    // let newToDo = new ToDo;
    // for (let key in req.body) newToDo[key] = req.body[key]; // add body k:v pairs to newModel object
    // console.log(newToDo);
    // newToDo.save((err, row) => {
    //   if (err) res.send(err);
    //   res.json(row);
    // });
    console.log(req.body);
    ref.child("todos").push(req.body)
      .then(() => {
        res.json({"message" : "write OK!",
                  "data" : req.body});
      }, (err) => {
        res.json({"message" : "error: " + err});
      });
  })
  .put((req, res) => {
    ToDo.findOneAndUpdate({ _id : req.params.id }, {$set : req.body}, {new : true}, (err, row) => {
      if (err) res.send(err);
      res.json(row);
    })
  })
  .delete((req, res) => {
    console.log("foo");
    res.json("********foo");
  })

app.use('/', router);

app.listen(8080);
console.log("Listening on port 8080");