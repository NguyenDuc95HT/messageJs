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
 
};
