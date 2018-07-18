'use strict';

import {blockController} from '../controllers/index';
import {Authentication} from '../middlewares';

module.exports = (app) => {

    app.route('/block')
        .get([Authentication.isAuth], blockController.getListBlock)
        .post([Authentication.isAuth], blockController.createBlock);
    app.route('/block/:id')
        .get([Authentication.isAuth], blockController.getOneBlock)
        .put([Authentication.isAuth], blockController.updateBlock)
        .delete([Authentication.isAuth], blockController.deleteBlock);
 
};
