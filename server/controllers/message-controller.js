'use strict';
import {Message, Op,Group , User, Block} from '../models';
import {Response} from '../helper';
export default class MessageController {
    getListMessages = async (req, res, next) => {
        try {
            const messages = await Message.findAll({
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
                    groupId
                }
            });
            if (block === null) {
                const newMessage = await Message.create({
                    authorId,
                    groupId,
                    body,
                    type
                });
                return Response.returnSuccess(res, newMessage);
            }
            return Response.returnError(res, new Error('User be blocked'))
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