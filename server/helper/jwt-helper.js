'use strict';
import {privateKey, publicKey} from '../config'
import JWT from 'jsonwebtoken';
export default class JWTHelper {
    static async sign (data) {
        return new Promise ((resolve, reject) => {
            JWT.sign(data, privateKey, {
                algorithm: 'RS256',
                    expiresIn: 60 * 60
            },
                (error, token) => {
                if (error) {
                   return reject(error);
                }
                return resolve(token);
            });
        });
    };
    static async verify(token) {
        return new Promise ((resolve, reject) => {
            JWT.verify(token, publicKey,{
                algorithms: 'RS256' ,
            }, (error, data) => {
                if (error) {
                    return reject(error);
                }
                return resolve(data);
            });
        });
    }
}