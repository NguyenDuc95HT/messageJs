'use strict';
import {groupController} from '../controllers/index';
import {Authentication} from '../middlewares';
module.exports = (app) => {
    app.route('/Group')
        .get([Authentication.isAuth], groupController.getListGroup)
        .post([Authentication.isAuth], groupController.createGroup);
    app.route('/Group/:id')
        .get([Authentication.isAuth], groupController.getOneGroup)
        .put([Authentication.isAuth], groupController.updateGroup)
        .delete([Authentication.isAuth], groupController.deleteGroup);
    app.route('/Group/:id/LeaveGroup')
        .get([Authentication.isAuth], groupController.leaveGroup);
    app.route('/Group/:id/member')
        .get([Authentication.isAuth], groupController.getlistMemberGroup)

};
