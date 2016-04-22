/// <reference path="typings/main.d.ts" />
System.register(['./controllers/login.controller'], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var login_controller_1;
    var express, app, port, router, _login, server;
    return {
        setters:[
            function (login_controller_1_1) {
                login_controller_1 = login_controller_1_1;
            }],
        execute: function() {
            express = require('express');
            app = express();
            port = process.env.PORT || 8080;
            router = express.Router();
            _login = new login_controller_1.LoginController();
            router.get('/login', _login.postLogin);
            app.use('/api', router);
            server = app.listen(port);
            console.log('http://127.0.0.1:' + port + '/api');
        }
    }
});
//# sourceMappingURL=main.js.map