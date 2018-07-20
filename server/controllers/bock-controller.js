'use strict';
import {Block, Op, User, Group, MemberGroup, Message} from '../models';
import {Response} from '../helper';
export default class BlockController {

    getListBlock = async (req, res, next) => {
        try {
            const blockList = await Block.findAll(
                {
                    include: [
                        {
                            model: User,
                            as: 'author',
                        },
                        {
                            model: User,
                            as: 'user',
                        },
                        {
                            model: Group,
                            as: 'group'
                        },
                    ]
                }
            );
            return Response.returnSuccess(res, blockList);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    getOneBlock =async(req, res, next) => {
        try {
            const {id} = req.params;
            const block = await Block.find(
                {
                    where: {
                        id,
                    },
                    include: [
                        {
                            model: User,
                            as: 'author',
                        },
                        {
                            model: User,
                            as: 'user',
                        },
                        {
                            model: Group,
                            as: 'group'
                        },
                    ]

                }
            );
            return Response.returnSuccess(res, block);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    createBlock = async (req, res, next) => {
        try {
            const authorId = req.user.id;
            const {userId, groupId} = req.body;
            const newBlock = await Block.create({
                authorId,
                userId,
                groupId
            });
            return Response.returnSuccess(res, newBlock);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    updateBlock = async (req, res, next) => {
        try {
            const {id} = req.params;
            const authorId = req.user.id;
            const {userId, groupId} = req.body;
            const updateBlock = await Block.update(
                {
                authorId,
                userId,
                groupId
                },
                {
                    where: {
                        id,
                        authorId,
                    },
                }

            );
            return Response.returnSuccess(res, updateBlock);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    deleteBlock = async (req, res, next) => {
        try {
            const {id} = req.params;
            const authorId = res.user.id;
            const delBlock = await Block.describe({
                where: {
                    id,
                    authorId,
                }
            });
            return Response.returnSuccess(res, delBlock);
        } catch (e) {
            return Response.returnError(res, e);
        }
    }
}