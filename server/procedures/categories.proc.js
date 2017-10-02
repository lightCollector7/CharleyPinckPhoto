var db = require('../config/db');

exports.procAll = function() {
    return db.fnRows('procGetCategories');
}