'use strict';
import {messageController} from '../controllers/index';
import {Authentication} from '../middlewares';
module.exports = (app) => {
    app.route('/block')
        .get([Authentication.isAuth], messageController.getListMessages)
        .post([Authentication.isAuth], messageController.createMessage);
    app.route('/block/:id')
        .get([Authentication.isAuth], messageController.getOneMessage)
        .put([Authentication.isAuth], messageController.updateMessage)
        .delete([Authentication.isAuth], messageController.deleteMessage);
};
