'use strict';
import {User} from '../models'
import {Response, JWTHelper, EncryptHelper} from '../helper';
export default class UserController {
    login = async(req, res, next) => {
        try {
            const {username, password} = req.body;
            if (username === undefined) {
                return Response.returnError(res, new Error('username undefined'));
            }
            let user = await  User.find({
                where: {
                    username
                }
            });
            const checkPass = await EncryptHelper.isExistText(password, user.password);
            if (!checkPass) {
                return Response.returnError(res, new Error('Password is invalid'));
            }
            const token = await JWTHelper.sign('privateKey',{
                id: user.id,
                username: user.username,
            });
            return Response.returnSuccess(res, {
                token
            });
        } catch (e) {
            return Response.returnError(res,e);
        }
    };
    getListUser = async (req, res, next) => {
        try {
            let users = await User.findAll(
                {
                    order: ['createdAt', 'DESC'],
                }
            );
            return Response.returnSuccess(res, users);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    getOneUser = async (req, res, next) => {
        try {
            const id = req.user.id;
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
            const {username, password, address} = req.body;
            if (!Array.isArray(address) || address.length === 0) {
                return Response.returnError(res, new Error('error'));
            }
            const newUser = await User.create({
                username,
                password: await EncryptHelper.executeEncrypt(password),
                address
            });
            return Response.returnSuccess(res, newUser);
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message
            })
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
            let author = req.user;
            console.log(author)
            let {oldPassword, newPassword} = req.body;
            let user = await User.find({
                where: {
                    id: author.id
                }
            });
            let checkPassword = await EncryptHelper.isExistText(oldPassword, user.password);
            if (checkPassword) {
                let hash = await EncryptHelper.executeEncrypt(newPassword);

                let updatedUser = await User.update(
                    {
                        password: hash,
                    },
                    {
                        where: {
                            id: author.id,
                        },
                        returning: true,
                    }
                );
                if (updatedUser[0] === 0) {
                    return Response.returnError(res, new Error('something wrong'));
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
    joinGroup = async (req, res, next) => {
        try {
            const {groupId} = req.body;
            const userId = req.user.id;
            const newMember = await MemberGroup.create({
                userId,
                groupId
            });
            return Response.returnSuccess(res, newMember);
        } catch (e) {
            return Response.returnError(res, e);

        }
    };
    blockUserGroup = async (req, res, next) => {
        try {
            const {userId, groupId} = req.params;
            const authorId = req.user.id;
            const group = await Group.find({
                where: {
                    authorId,
                    id: groupId
                }
            });
            if (group !== null) {
                const newBlock = await Block.create({
                    authorId,
                    userId,
                    groupId
                });
                return Response.returnSuccess(res, newBlock);
            }
            return Response.returnError(res, new Error('user not author'))
        } catch (e) {
            return Response.returnError(res, e);
        }

}