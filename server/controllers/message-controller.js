'use strict';
import {Message, Op, Group, User, Block, MemberGroup} from '../models';
import {Response} from '../helper';
export default class MessageController {
    getListMessages = async (req, res, next) => {
        try {
            const messages = await Message.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [
                    {
                        model: User,
                        as: 'author'
                    },
                    {
                        model: Group,
                        as: 'group'
                    }
                ],
                attributes: {
                    exclude: [
                        'authorId',
                        'groupId'
                    ],
                }
            });
            return Response.returnSuccess(res, messages);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    getOneMessage = async (req, res, next) => {
        try {
            const {id} = req.params;
            const message = await Message.find({
                include: [
                    {
                        model: User,
                        as: 'author'
                    },
                    {
                        model: Group,
                        as: 'group'
                    }
                ],
                attributes: {
                    exclude: [
                        'authorId',
                        'groupId'
                    ],
                },
                where: {
                    id
                }
            });
            if (!message) {
                return Response.returnError(res, new Error('Message not found'));
            }
            return Response.returnSuccess(res, message);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    createMessage = async (req, res, next) => {
        try {
            const authorId = req.user.id;
            const {groupId, body, type} = req.body;
            const block = await Block.find({
                where: {
                    authorId,
                    groupId,
                }
            });
            const group = await  Group.find({
                where: {
                    groupId,
                }
            });
            const member = await MemberGroup.find({
                where:{
                    groupId,
                    userId: authorId
                }
            });
            if (group === null) {
                return Response.returnError(res, new Error('group does not exist'));
            }
            if (group.authorId !== authorId && member === null) {
                return Response.returnError(res, new Error('user is not in the group'));
            }
            if (block !== null && group.type === 'private') {
                for (block.authorId in block) {
                    if (block.authorId === authorId) {
                        return Response.returnError(res, new Error('Blocked users'))
                    }
                }
            }
            const newMessage = await Message.create({
                authorId,
                groupId,
                body,
                type
            });
            return Response.returnSuccess(res, newMessage);

        } catch (e) {
            return Response.returnError(res, e);
        }
    };
    updateMessage = async (req, res, next) => {
        try {
            const {id} = req.params;
            const {groupId, body, type} = req.body;
            const authorId = req.user.id;
            const updatedMessage = await Message.update(
                {
                    groupId,
                    body,
                    type
                },
                {
                    where: {
                        id,
                        authorId
                    },
                    returning: true
                }
            );
            return Response.returnSuccess(res, updatedMessage);
        } catch (e) {
            return Response.returnError(res, new Error('update wrong'));
        }
    };

    deleteMessage = async (req, res, next) => {
        try {
            const {id} = req.params;
            const authorId = req.user.id;
            const message = await Message.destroy({
                where: {
                    id,
                    authorId
                }
            });
            return Response.returnSuccess(res, message);
        } catch (e) {
            return Response.returnError(res, e);
        }
    };
}