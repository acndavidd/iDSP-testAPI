/// <reference path="typings/main.d.ts" />

'use strict';

import {LoginController} from './controllers/login.controller';
var express = require('express');
var app = express();

const port:number = process.env.PORT || 8080;
const router = express.Router();

const _login:LoginController = new LoginController();

router.get('/login',_login.postLogin);

app.use('/api',router);

var server = app.listen(port);
console.log('http://127.0.0.1:'+port + '/api');


