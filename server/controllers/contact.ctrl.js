var express = require('express');
var emailSvc = require('../services/email.svc');

var router = express.Router();
router.post('/', function (req, res) {
    emailSvc.sendEmail(req.body.fromEmail, req.body.subject, req.body.content)
        .then(function (success) {
            console.log(success);
            res.send('Email Send');
        }, function (err) {
            console.log(err);
            console.log('Sending error');
            res.sendStatus(500);
        });
});

module.exports = router;