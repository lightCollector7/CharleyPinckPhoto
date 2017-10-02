var db = require('../config/db');

exports.procGetLiveMusicPhotos = function() {
    return db.fnRows('procGetLiveMusicPhotos');
}
