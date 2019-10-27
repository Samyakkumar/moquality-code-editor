var express = require('express');
var router = express.Router();

const uuidv4 = require("uuid/v4")

var admin = require("firebase-admin");
var serviceAccount = require("./moquality-code-internship-98b8df359a65.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://moquality-code-internship.firebaseio.com"
// });
var db = admin.database();
var root = db.ref();

var gen = []
router.get("/", function(req, res, next){
    var uData = {
        "user": {
            "currLang" : "javascript",
            "infoTyped": "Your code here..."
        }
    }
    var newDataRef = root.push(uData);
    var id = newDataRef.toString().split("/")[3]
    res.cookie("userId", id).send(id)
})

module.exports = router;
