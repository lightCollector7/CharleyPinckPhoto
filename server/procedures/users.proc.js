var db = require('../config/db');

exports.procGetUsers = function() {
    return db.fnRows('procGetUsers');
}

exports.procGetUserByEmail = function(email){
        return db.fnRow('procGetByEmail',[email]);
}

exports.procGetUser = function(id){
    return db.fnRow('procGetUser', [id]);
}


exports.procInsertUser = function(firstname, lastname, email, password, role){
    return db.fnRow('procInsertUser', [firstname, lastname, email, password, role])  
}

exports.procUpdateUser = function(id,firstname, lastname, email, role){
    return db.fnEmpty('procUpdateUser', [id, firstname, lastname, email, role])
}

exports.procDeleteUser = function(id){
   return db.fnEmpty('procDeleteUser', [id]);
}
