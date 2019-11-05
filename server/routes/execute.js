var express = require('express');
var router = express.Router();
var axios = require('axios')
var fetch = require("node-fetch")
router.post("/", (req, res, next) => {
    var data = req.body;
    var clientID = "f70bf103def41409918d0ab6fb7475f4";
    var clientSecret = "4e78a46eadf6a7ede808ed9db33c7fe7468a7bacf8e073f21691d412435adc71";
    var script = data.script;
    var language = data.language;
    var executeDoodle = "https://api.jdoodle.com/v1/execute";
    var creditCheckUrl = "https://api.jdoodle.com/v1/credit-spent";

    var sendToExecute = {
        "clientId": "f70bf103def41409918d0ab6fb7475f4",
        "clientSecret": "4e78a46eadf6a7ede808ed9db33c7fe7468a7bacf8e073f21691d412435adc71",
        "script": script,
        "language": language,
        "versionIndex" : 2
    }
    var result = "";
    axios.defaults.headers.post["Content-type"] = "application/json"
    var checkCreds = {
        "clientId": "f70bf103def41409918d0ab6fb7475f4",
        "clientSecret": "4e78a46eadf6a7ede808ed9db33c7fe7468a7bacf8e073f21691d412435adc71"
    }
    axios({
        method: "POST",
        url: creditCheckUrl,
        data: checkCreds
    }).then(((dat) => {
        if (dat.data.used < 200) {
            axios({
                method: "POST",
                url: executeDoodle,
                data: sendToExecute
            }).then((dat) => {
                res.status(200).send(dat.data)
            })
        } else {
            res.status(500).send(JSON.stringify({"message": "no credit left"}))
        }
    }))
})

module.exports = router;