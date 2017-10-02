var path = require('path');
var bcrypt = require('bcrypt');
const saltRounds = 12;

// exports.encryptPassword = function(pw){
//     return new Promise(function(resolve, reject){
//         bcrypt.hash(pw, saltRounds, function(err, hash){//pw=plaintext password, constant saltRounds
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(hash);//returns the generated hash on resolve
//             }
//         });
//     });
// }

// exports.checkPassword = function(pw, hash){
//     return new Promise(function(resolve, reject){
//         bcrypt.compare(pw, hash, function(err, passwordMatches){//passwordMatches is either going to be true or false
//             if(err){
//                 reject(err);
//             }else{
//                 resolve(passwordMatches);
//             }
//         })
//     })
// }


exports.isAsset = function(urlPath) {
    var pieces = urlPath.split('/');
   
    if (pieces.length === 0) {
        return false;
    }
    var lastPiece = pieces[pieces.length - 1];
    if (urlPath.indexOf('/api') !== -1 || urlPath.indexOf('/?') !== -1) {
        // If the path contains /api or /?
        return true;
    } else if (lastPiece.indexOf('.') !== -1) {
        // If the last pieces of the url (the part after the last /) contains a dot, it must be a file
        return true;
    } else {
        return false;
    }
}