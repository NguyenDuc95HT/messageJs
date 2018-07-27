'use strict';
import {Group, Op, User, MemberGroup, Message, Block} from '../models';
import {encryptHelper,Response} from '../helper';
export default class UserController {

    getListGroup = async (req, res, next) => {
        try {
            let groups = await Group.find(
                {
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: User,
                            as: 'author'
                        }
                    ],
                    attributes: {
                        exclude: ['authorId']
                    }
                }
            );
            return Response.returnSuccess(res, groups);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    getOneGroup = async (req, res, next) => {
        try {
            let {id} = req.params;
            let Group = await  Group.find({
                include: [
                    {
                        model: User,
                        as: 'author',
                    }
                ],
            });
            Response.returnSuccess(res, Group);
        } catch (e) {
            Response.returnError(res, e)
        }
    };
    createGroup= async (req, res, next) => {
        try {
            const authorId = req.user.id;
            let {name, avatar , type } = req.body;
            let newGroup = await Group.create({
                authorId,
                name,
                avatar,
                type,
            });
            Response.returnSuccess(res, newGroup);
        } catch (e) {
            Response.returnError(res, e);
        }
    };
    updateGroup = async (req, res, next) => {
        try {
            let id = req.params;
            const authorId = req.user.id;
            let {name, type, avatar} = req.body;
            let updateGroup= await User.update(
                {
                    name,
                    type,
                    avatar
                },
                {
                    where: {
                        id,
                        authorId
                    },
                    returning: true,
                }
            );
            return res.status(200).json({
                success: true,
                data: updateGroup
            })
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            })
        }
    };
    deleteGroup = async (req, res, next) => {
        try {
            const authorId = req.user.id;
            let {id} = req.params;
            await Group.describe({
                where: {
                    id,
                    authorId
                }
            });
            return res.status(200).json({
                success: true,
            });
        } catch (e) {
            return res.status(400).json({
                success: false,
                error: e.message,
            });
        }
    };
    getlistMemberGroup = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const {id} = req.params;
            const block = await Block.find({
                where: {
                    authorId: userId,
                }
            });
            const member = await MemberGroup.find({
                where: {
                    groupId: id,
                }
            });
            if (block){
                for (block.userId of block) {
                    if (block.userId === member.userId) {
                        return Response. returnError(res, new Error('blocked user'))
                    }
                }
            }
            return Response.returnSuccess(res,member)
        } catch (e) {

        }
    };
    leaveGroup = async (req, res, next) => {
        try {
            const userId = req.user.id;
            let {id} = req.params;
            await MemberGroup.describe({
                where: {
                    groupId: id,
                    userId,
                }
            });
            return Response.returnSuccess(res, 'has leave group')
        } catch (e) {
            return Response.returnError(res, e);
        }
    }
};