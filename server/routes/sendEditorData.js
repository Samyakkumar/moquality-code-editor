var express = require('express');
var router = express.Router();

var admin = require("firebase-admin");

var admin = require("firebase-admin");
var serviceAccount = require("./moquality-code-internship-firebase-adminsdk-cczta-f5ddad25df.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://moquality-code-internship.firebaseio.com"
});

var db = admin.database();
var root = db.ref();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var body = req.body;
  var tbr = {
    "user" : {
      "currLang": body.user.currLang,
      "infoTyped": body.user.infoTyped
    }
  }
  var user = root.child(body.id)
  user.transaction(function(curr) {
    // If users/ada/rank has never been set, currentRank will be `null`.
    return tbr;
  });
  
  res.send("Data sent");
});

router.get('/user/:id', function(req, res, next) {
  var user = root.child(req.params.id)
  var data = ""
  var result = user.once("child_changed", function(snap) {
    return snap.val() }, function (errorObject) {
      console.log("The read failed: " + errorObject.code)}
      );
  result.then(dat => {
    res.send(JSON.stringify(dat))
  })
  
  
});

router.get('/userOnce/:id', function(req, res, next) {
  var user = root.child(req.params.id)
  var data = ""
  var result = user.once("value", function(snap) {
    return snap.val() }, function (errorObject) {
      console.log("The read failed: " + errorObject.code)}
      );
  result.then(dat => {
    res.send(JSON.stringify(dat))
  })
  
  
});

module.exports = router;
