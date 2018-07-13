'use strict';
import {User} from '../models'
export default class UserController {

    getListUser = async (req, res, next) => {
        try {
            let users = await User.findAll(
                {
                    order: ['createdAt', 'DESC'],
                }
            );
            return res.status(200).json({
                success: true,
                data: users,
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            });
        }
    };
    getOneUser = async (req, res, next) => {
        try {
            let  {id} = req.params;
            let user = await  User.findById(id);
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            return res.status(400).json({
                success: true,
                error: e.message
            });
        }
    };
    createUser = async (req, res, next) => {
        try {
            let {username, password, address} = req.body;
            let newUser = await User.create({
                username,
                password,
                address,
            });
            return res.status(200).json({
                success: true,
                data: newUser,
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            });
        }
    };
    updateUser = async(req, res, next) => {
        try {
            let {id} = req.params;
            let {username, address} = req.body;
            let updateUser = await User.update(
                {
                username,
                address,
                },
                {
                    where: {
                        id
                    },
                    returning: true,
                }
            );
            return res.status(200).json({
                success:true,
                data: updateUser
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            })
        }
    };
    deleteUser = async(req, res, next) => {
      try {
          let {id} = req.params;
          await User.describe({
              where: {
                  id
              }
          });
          return res.status(200).json({
             success: true,
          });
      }  catch (e) {
          return res.status(400).json({
              success: false,
              error: e.message,
          });
      }
    };
    searchUser = async (req, res, next) => {
        try {
            let {username} = req.params;
            let user = await User.find({
                where: {
                    username
                }
            });
                return res.status(200).json(user.dataValues);
        } catch (e) {
            console.log(e);
            return res.status(400).json({
                success: false,
                error: e.message
            });
        }
    };
    changePassword = async (req, res, next) => {
        try {
            let {id} = req.params;
            let {oldPassword, newPassword} = req.body;
            let user = await User.find({
                where: {
                    id
                }
            });
            let checkPassword = await encryptHelper.isExistText(oldPassword, user.password);
            if (checkPassword) {
                let hash = await encryptHelper.executeEncrypt(newPassword);

                let updatedUser = await User.update(
                    {
                        password: hash,
                    },
                    {
                        where: {
                            id,
                        },
                        returning: true,
                    }
                );
                if (updatedUser[0] === 0) {
                    return res.status(400).json({
                        success: false,
                        error: 'cannot change password'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: updatedUser,
                });
            }
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            });
        }
    };


}