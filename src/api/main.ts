/// <reference path="typings/main.d.ts" />
'use strict';

import {LoginController} from './controllers/login.controller';
import {TokenService} from './services/token.service';
import {ORMService} from './services/orm.service';

var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
const PORT:number = process.env.PORT || 8080;
const ROUTER = vExpress.Router();

var loginCtrl:LoginController = new LoginController();
var tokenSvc:TokenService = new TokenService();
var ormSvc:ORMService = new ORMService();

vApp.use(vBodyParser.urlencoded({extended: true}));
vApp.use(vBodyParser.json());
vApp.use(vCookieParser());

vApp.use(function(pReq, pRes, pNext) {
    /*Allow access control origin*/
    let vAllow: string;
    let vOrigin: string = pReq.get('origin');
    if (vOrigin == 'http://localhost:3000') {
        vAllow = 'http://localhost:3000';
    }
    if(vAllow) {
         pRes.header("Access-Control-Allow-Origin", vAllow);
    }
    pRes.header("Access-Control-Allow-Credentials", "true");
    pRes.header("Access-Control-Allow-Headers", 
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
    pRes.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST");

    //validate token
    console.log("Origin : " + pReq.get('origin') + " Path : " + pReq.path);
    if(pReq.path !== '/service/login' && pReq.path !== '/service/refreshModels'){//all request to service will validate token except login
        var vToken = '';
        try{
            if(pReq.cookies['accessToken']){//accessed from web
                vToken = vCookieParser.JSONCookies(pReq.cookies).accessToken;
            }else{//accessed from mobile
                vToken = pReq.get('Authorization');
                vToken = vToken.replace('Bearer ','');
            }
            var jwt = tokenSvc.verifyToken(vToken);
            pReq.locals.jwt = jwt;
            if(pReq.path === '/service/verifyToken'){
                var vResult = {
                    success : 1,
                    token : jwt
                };
                pReq.json(vResult);
            }
        }catch(err){
            console.log("error : " + err);
            pRes.sendStatus(403);
        }      
    }
    pNext();
});
ROUTER.get('/refreshModels',ormSvc.refreshModels);

ROUTER.post('/login',loginCtrl.doLogin);
ROUTER.get('/logout',loginCtrl.doLogout);


vApp.use('/service',ROUTER);
vApp.listen(PORT);
console.log('http://127.0.0.1:' + PORT + '/service');