/// <reference path="typings/main.d.ts" />
'use strict';

import {AccountController} from './controllers/account/account.controller';
import {SequelizeService} from './services/sequelize.service';

var vPath = require("path");
var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
var vConfig = require(vPath.join(__dirname, '.', 'config', 'config.json'))[vEnv];
var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
var vValidator = require('validator');
var vSOAP = require('soap');
const PORT: number = process.env.PORT || vConfig.port || 8080;

vApp.use(vBodyParser.urlencoded({extended: true}));
vApp.use(vBodyParser.json());
vApp.use(vCookieParser());
vApp.use(function(pRequest, pResponse, pNext) {
    // Allow access control origin
    let vAllow: string;
    let vOrigin: string = pRequest.get('origin');
    if (vOrigin == 'http://localhost:3000') {
        vAllow = 'http://localhost:3000';
    }
    if(vAllow) {
         pResponse.header('Access-Control-Allow-Origin', vAllow);
    }
    pResponse.header('Access-Control-Allow-Credentials', 'true');
    pResponse.header('Access-Control-Allow-Headers', 
        'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session');
    pResponse.header('Access-Control-Allow-Methods','GET,PUT,DELETE,POST');
    if(
        pRequest.path.indexOf('/service/account') !== -1 && // all account service doesn't require token
        pRequest.path.indexOf('/testing') !== -1 //bypass token for testing purpose
    ){
        if(pRequest.method !== 'OPTIONS') {
            // all request to service will validate token except login & logout
            var vToken = '';
            try{
                if(pRequest.cookies['accessToken']){ //accessed from web
                    vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
                }else{ // accessed from mobile
                    vToken = pRequest.get('Authorization');
                    vToken = vToken.replace('Bearer ','');
                }
                // var jwt = vTokenSvc.verifyToken(vToken);
                // pResponse.locals.jwt = jwt;
            }catch(pErr){
                pResponse.sendStatus(403);
            }
        }
    }
    // Sanitize all the parameters send with POST request
    if(pRequest.method === 'POST') {
        for(let param in pRequest.body) {
            pRequest.body[param] = vValidator.escape(pRequest.body[param]);
        }
    }
    pNext();
});

var vRouter = vExpress.Router();

// Open connection pool for database access using sequelize
let vSequelizeService = new SequelizeService();

let vAccountController =  new AccountController();
vRouter.post('/account', vAccountController.authenticate);
vRouter.post('/account/:id/MPIN', vAccountController.submitMPIN);
vRouter.get('/account/logout', vAccountController.logout);
vRouter.post('/account/test', vAccountController.testSP);


// define instance of your controller and route here

// let aa = new aa();
// vRouter.method('/aa', aa.bb);


// let bb = new bb();
// vRouter.method('/bb' bb.aa);

vApp.use('/service',vRouter);

// for testing purpose, will not validate token
var vTesting = vRouter;
vApp.use('/testing',vTesting);

vApp.listen(PORT);

/*
var CronJob = require('cron').CronJob;
var job = new CronJob('* * 0 * * *', function() {
    console.log('Start Running scheduler for generate call plan');
    vSchedCtrl.generateCallPlan();
}, function () {

}, true, 'Asia/Manila');
*/ 
console.log('http://127.0.0.1:' + PORT + '/service');
console.log('http://127.0.0.1:' + PORT + '/testing');