'use strict';
import JWT from 'jsonwebtoken';
export default class JWTHelper {
    static async sign (privateKey, data) {
        return new Promise ((resolve, reject) => {
            JWT.sign(data, privateKey, (error, data) => {
                if (error) {
                   return reject(error);
                }
                return resolve(data);
            });
        });
    };
    static async verify(privateKey, token) {
        return new Promise ((resolve, reject) => {
            JWT.verify(token, privateKey, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
}