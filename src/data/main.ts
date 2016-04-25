/// <reference path="typings/main.d.ts" />

'use strict';

import {LoginController} from './controllers/login.controller';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const port:number = process.env.PORT || 8080;
const router = express.Router();

const loginCtrl:LoginController = new LoginController();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
router.get('/login',loginCtrl.postLogin);

app.use('/api',router);

var server = app.listen(port);
console.log('http://127.0.0.1:'+port + '/api');


