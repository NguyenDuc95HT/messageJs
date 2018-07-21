'use strict';
import {privateKey, publicKey} from '../config'
import JWT from 'jsonwebtoken';
export default class JWTHelper {
    static async sign (data) {
        return new Promise ((resolve, reject) => {
            JWT.sign(data, privateKey, (error, data) => {
                if (error) {
                   return reject(error);
                }
                return resolve(data);
            });
        });
    };
    static async verify(token) {
        return new Promise ((resolve, reject) => {
            JWT.verify(token, publicKey, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
}