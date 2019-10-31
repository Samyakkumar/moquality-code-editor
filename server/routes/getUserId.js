var express = require('express');
var router = express.Router();

const uuidv4 = require("uuid/v4")

var admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://moquality-code-internship.firebaseio.com"
// });
var db = admin.database();
var root = db.ref();
router.get("/:useDb", function(req, res, next){
    var useDb = req.params.useDb;
    console.log(useDb)
    var uData = {
        "user": {
            "currLang" : "javascript",
            "infoTyped": "Your code here..."
        }
    }
    var newDataRef = "";
    if (useDb == 'true'){
        newDataRef = {
            id: root.push(uData).toString().split("/")[3],
            useDb: useDb
        }
    } else {
        newDataRef = {
            id: uuidv4(),
            useDb: useDb
        }
    }
    res.cookie("userId", newDataRef.id).cookie("usingDb", useDb).send(JSON.stringify(newDataRef))
})

module.exports = router;
