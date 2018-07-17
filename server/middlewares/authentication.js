'use strict';
import {Response, JWTHelper} from '../helper';
export default class Authentication {
    static isAuth = async (req, res, next) => {
        try {
            let token = null;
            let authorization = null;
            if (req.query.token !== undefined) {
                token = req.query.token;
            } else if (req.headers.authorization !== undefined) {
                authorization = req.headers.authorization; // token = Bearer
            } else if (req.body.token !== undefined) {
                authorization = req.body.token; // token = Bearer
            }
            if (token !== null) {
                req.user = await JWTHelper.verify('privateKey', token);
            } else if (authorization !== null) {
                const tokens = authorization.split('Bearer ');
                if (tokens.length !== 2) {
                    return Response.returnError(res, new Error('Token wrong format'));
                }
                req.user = await JWTHelper.verify('privateKey', tokens[1]);
            } else {
                return Response.returnError(res, new Error('Token not provided'));
            }
            return next();
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
}