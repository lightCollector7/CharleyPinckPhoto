var db = require('../config/db');

exports.procGetPlacesThingsPhotos = function() {
    return db.fnRows('procGetPlacesThingsPhotos');
}