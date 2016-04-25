/// <reference path="typings/main.d.ts" />
'use strict';
const login_controller_1 = require('./controllers/login.controller');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const router = express.Router();
const loginCtrl = new login_controller_1.LoginController();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.get('/login', loginCtrl.postLogin);
app.use('/api', router);
var server = app.listen(port);
console.log('http://127.0.0.1:' + port + '/api');
//# sourceMappingURL=main.js.map