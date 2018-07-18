import UserController from './user-controller';
import GroupController from './group-controller';
import blockController from "./bock-controller";
module.exports = {
    userController: new UserController(),
    groupController: new GroupController(),
    blockController: new  blockController(),
};