'use strict';
import {Block} from '../models'
export default class UserController {

    getListBlock = async (req, res, next) => {
        try {
            const Block = await Block.findAll(
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
            return response.returnSuccess(res, Block);
        } catch (e) {
            return response.returnError(res, e);
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
            )
        } catch (e) {
            return response.returnError(res, e);
        }
    }
    createBlock = async (req, res, next) => {
        try {
            const {authorId, userId, groupId} = req.body;
            const newBlock = await Block.create({
                authorId,
                userId,
                groupId
            });
            return response.returnSuccess(res, newBlock);
        } catch (e) {
            return response.returnError(res, e);
        }
    };
    updateBlock = async (req, res, next) => {
        try {
            const {authorId, userId, groupId} = req.body;
            const updateBlock = await Block.update(
                {
                authorId,
                userId,
                groupId
                },
                {
                    where: {
                        id
                    },
                }

            );
            return response.returnSuccess(res, newBlock);
        } catch (e) {
            return response.returnError(res, e);
        }
    };
}