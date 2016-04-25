/// <reference path="typings/main.d.ts" />
'use strict';
const login_controller_1 = require('./controllers/login.controller');
var express = require('express');
var app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const _login = new login_controller_1.LoginController();
router.get('/login', _login.postLogin);
app.use('/api', router);
var server = app.listen(port);
console.log('http://127.0.0.1:' + port + '/api');
//# sourceMappingURL=main.js.map