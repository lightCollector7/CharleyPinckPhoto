var express = require('express');
var procedures = require('../procedures/engagementPhotos.proc');

var router = express.Router();


router.route('/')
    .get(function(req, res) {
        procedures.procGetEngagementPhotos().then(function(engagementPhotos) {
            res.send(engagementPhotos);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

module.exports = router;