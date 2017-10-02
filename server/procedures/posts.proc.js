var db = require('../config/db');

exports.procAll = function (){
    return db.fnRows('procGetPosts');
}

exports.procRead = function(id) {
    return db.fnRow('procGetPost', [id]);
}

exports.procCreate = function(title, userid, categoryid, content) {
    return db.fnRow('procInsertPost', [title, userid, categoryid, content]);
}

exports.procUpdate = function(id, categoryid, title, content) {
    return db.fnEmpty('procUpdatePost', [id, categoryid, title, content]);
}

exports.procDestroy = function(id) {
    return db.fnEmpty('procDeletePost', [id]);
}

exports.procGetPostsByUser = function(id) {
    return db.fnRows('procGetPostsByUser', [id]);
}