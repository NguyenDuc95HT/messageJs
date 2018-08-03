'use strict';
import {Group, Op, User, MemberGroup, Message, Block} from '../models';
import {encryptHelper,Response} from '../helper';
import {groupRepository} from '../repositories'
export default class UserController {

    getListGroup = async (req, res, next) => {
        try {
            const memberGroups = await memberGroupRepository.getAll({
                where: {
                    userId: req.user.id
                },
                attributes: ['groupId']
            });
            const groupIds = memberGroups.map(item => item.groupId);
            const groups = await groupRepository
                .getAll(
                    {
                        where: {
                            id: groupIds
                        },
                        attributes: {
                            exclude: ['authorId']
                        },
                        order: [
                            ['createdAt', 'DESC']
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
                ],
            });
            Response.returnSuccess(res, Group);
        } catch (e) {
            Response.returnError(res, e)
        }
    };
    createGroup= async (req, res, next) => {
        let newGroup = null;
        try {
            const userLoginId = req.user.id;
            const { name, type, memberIds, partnerId } = req.body;
            let memberGroupIds = [];
            switch (type) {
                case 'private':
                    if (partnerId === undefined) {
                        return Response.returnError(res, new Error('partnerId is required field'));
                    }
                    const existingGroup = await Group.findOne({
                        where: {
                            [Op.or]: [
                                {
                                    authorId: userLoginId,
                                    partnerId: partnerId
                                },
                                {
                                    partnerId: userLoginId,
                                    authorId: partnerId
                                }
                            ]
                        }
                    });
                    if (existingGroup) {
                        return Response.returnSuccess(res, existingGroup);
                    }

                    memberGroupIds = [userLoginId, partnerId];
                    break;
                case 'group':
                    if (name === undefined) {
                        return Response.returnError(res, new Error('name group is required field'));
                    }
                    if (memberIds === undefined || !Array.isArray(memberIds) || memberIds.length === 0) {
                        return Response.returnError(res, new Error('member group is invalid'));
                    }
                    if (!memberIds.includes(userLoginId)) {
                        memberIds[memberIds.length] = userLoginId;
                    }
                    memberGroupIds = memberIds;
                    break;
                default:
                    return Response.returnError(res, new Error('Invalid type group'));
            }
            newGroup = await Group.create({
                name,
                authorId: userLoginId,
                type,
                partnerId
            });
            const memberGroups = memberGroupIds.map(item => {
                return {
                    userId: item,
                    groupId: newGroup.id
                }
            });
            await MemberGroup.bulkCreate(memberGroups); // Check if not create member group successfully
            return Response.returnSuccess(res, newGroup);
        } catch (e) {
            if (newGroup) {
                Group.destroy({
                    force: true,
                    where: {
                        id: newGroup.id
                    }
                });
            }
            return Response.returnError(res, e);
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