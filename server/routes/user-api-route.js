'use strict';

import {userController} from '../controllers/index';
import {Authentication, Role} from '../middlewares';

module.exports = (app) => {

    app.route('/users')
        .get([Authentication.isAuth, Role.isAdmin], userController.getListUser)
        .post([Authentication.isAuth], userController.createUser);
    app.route('/users/:id')
        .get([Authentication.isAuth], userController.getOneUser)
        .put([Authentication.isAuth], userController.updateUser)
        .delete([Authentication.isAuth, Role.isAdmin], userController.deleteUser);
    app.route('/users/search/:username')
        .get([Authentication.isAuth], userController.searchUser);
    app.route('/users/changePassword')
        .post([Authentication.isAuth],userController.changePassword);
    app.route('/login')
        .post( userController.login)
};
