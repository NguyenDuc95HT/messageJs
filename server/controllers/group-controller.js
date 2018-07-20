'use strict';
import {Group, Op, User, MemberGroup, Message, Block} from '../models';
import {encryptHelper,Response} from '../helper';
export default class UserController {

    getListGroup = async (req, res, next) => {
        try {
            let groups = await Group.find(
                {
                    attributes: {
                        exclude: ['authorId']
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [
                        {
                            model: User,
                            as: 'author',
                        },
                    ]
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
                ]
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
};