import UserController from './user-controller';
import GroupController from './group-controller';
import BlockController from './bock-controller';
import MessageController from './message-controller';
module.exports = {
    userController: new UserController(),
    groupController: new GroupController(),
    blockController: new  BlockController(),
    messageController: new MessageController(),
};