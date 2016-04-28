/// <reference path="typings/main.d.ts" />
'use strict';
const login_controller_1 = require('./controllers/login.controller');
const token_service_1 = require('./services/token.service');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;
const router = express.Router();
var loginCtrl = new login_controller_1.LoginController();
var tokenSvc = new token_service_1.TokenService();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    /*Allow access control origin*/
    let allow;
    let origin = req.get('origin');
    if (origin == 'http://localhost:3000') {
        allow = 'http://localhost:3000';
    }
    if (allow) {
        res.header("Access-Control-Allow-Origin", allow);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
    res.header("Access-Control-Allow-Methods", "GET,PUT,DELETE,POST");
    //validate token
    if (req.path !== '/service/login') {
        var token = '';
        if (req.cookies['accessToken']) {
            token = cookieParser.JSONCookies(req.cookies).accessToken;
        }
        else {
            token = req.get('Authorization');
            token = token.replace('Bearer ', '');
        }
        try {
            var jwt = tokenSvc.verifyToken(token);
            res.locals.jwt = jwt;
            console.log(jwt);
        }
        catch (err) {
            console.log("error : " + err);
            res.sendStatus(403);
        }
    }
    next();
});
router.post('/login', loginCtrl.doLogin);
router.get('/check', loginCtrl.checkToken);
app.use('/service', router);
app.listen(port);
console.log('http://127.0.0.1:' + port + '/service');
//# sourceMappingURL=main.js.map