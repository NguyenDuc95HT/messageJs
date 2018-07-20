'use strict';
import {RoleVerify, Reponse} from '../helper'

export default class Role {
    static isAdmin = async (req, res, next) => {
        try {
            const role =  await RoleVerify.getRole(req.user.id);
            if (role === 'admin') {
                return next();
            } else {
                return Reponse.returnError(res, new Error('user not admin'));
            }
        } catch (e) {
            return Reponse.returnError(res, e);
        }
    }
}