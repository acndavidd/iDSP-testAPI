/// <reference path="typings/main.d.ts" />
'use strict';
const login_controller_1 = require('./controllers/login.controller');
var express = require('express');
var app = express();
const port = process.env.PORT || 8080;
const router = express.Router();
const _login = new login_controller_1.LoginController();
/*
app.use(function(req, res, next) {
    let allow: string;
    let origin: string = req.get('origin');
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
});
*/
router.get('/login', _login.postLogin);
app.use('/api', router);
var server = app.listen(port);
console.log('http://127.0.0.1:' + port + '/api');
//# sourceMappingURL=main.js.map