var db = require('../config/db');

exports.procGetPortraitPhotos = function() {
    return db.fnRows('procGetPortraitPhotos');
}
