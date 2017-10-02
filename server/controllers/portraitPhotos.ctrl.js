var express = require('express');
var procedures = require('../procedures/portraitPhotos.proc');

var router = express.Router();


router.route('/')
    .get(function(req, res) {
        procedures.procGetPortraitPhotos().then(function(portraitPhotos) {
            res.send(portraitPhotos);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

module.exports = router;