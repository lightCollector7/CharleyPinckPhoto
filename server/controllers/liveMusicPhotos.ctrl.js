var express = require('express');
var procedures = require('../procedures/liveMusicPhotos.proc');

var router = express.Router();


router.route('/')
    .get(function(req, res) {
        procedures.procGetLiveMusicPhotos().then(function(liveMusicPhotos) {
            res.send(liveMusicPhotos);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

module.exports = router;