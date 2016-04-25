/// <reference path="typings/main.d.ts" />

'use strict';

import {LoginController} from './controllers/login.controller';
var express = require('express');
var app = express();

const port:number = process.env.PORT || 8080;
const router = express.Router();

const _login:LoginController = new LoginController();

router.get('/login',_login.postLogin);

app.use(function(req, res, next) {
	let allow: string;
    let origin: string = req.get('origin');
    console.log('origin: ' + req.get('origin'));
    if (origin == 'http://localhost:3000') {
        allow = 'http://localhost:3000';
    } 
    else if (origin == 'http://smart-web.s3-website-ap-southeast-1.amazonaws.com') {
        allow = 'http://smart-web.s3-website-ap-southeast-1.amazonaws.com';
    }
    if (allow) {
    	console.log('allow : ' + allow);
        res.header("Access-Control-Allow-Origin", allow);
    }
    //res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", 
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
    res.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST");
});

app.use('/api',router);

var server = app.listen(port);
console.log('http://127.0.0.1:'+port + '/api');


