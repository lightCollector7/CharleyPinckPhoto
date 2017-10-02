var express = require('express');
var procedures = require('../procedures/categories.proc');

var router = express.Router();

router.route('/')
    .get(function(req, res){
        procedures.procAll().then(function(categories){
            res.send(categories);
        }, function(err){
            console.log(err);
            res.sendStatus(500);
        
        });
    });

module.exports = router;