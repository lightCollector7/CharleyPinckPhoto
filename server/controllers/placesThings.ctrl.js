var express = require('express');
var procedures = require('../procedures/placesThings.proc');

var router = express.Router();


router.route('/')
    .get(function(req, res) {
        procedures.procGetPlacesThingsPhotos().then(function(placesThingsPhotos) {
            res.send(placesThingsPhotos);
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })

module.exports = router;