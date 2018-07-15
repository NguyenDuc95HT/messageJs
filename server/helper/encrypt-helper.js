'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 5;
let salt = bcrypt.genSaltSync(saltRounds);
export default class EncryptHelper {
    executeEncrypt = (text) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(text, salt, function (err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        })
    };
    isExistText = (text, hash) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(text, hash, function (err, res) {
                if (res === true) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    };
}