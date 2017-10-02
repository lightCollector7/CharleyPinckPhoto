var db = require('../config/db');

exports.procGetEngagementPhotos = function() {
    return db.fnRows('procGetEngagementPhotos');
}
