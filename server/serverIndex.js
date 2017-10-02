var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var utils = require('./utils.js');
var configurePassport = require('./config/passport');
var api = require('./api');




var fs = require('fs');



var app = express();
var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);

app.get('*', function(req, res, next) {
    if (utils.isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

app.listen(process.env.PORT || 3000);
console.log("server listening on port 3000");

//==================================================================//


