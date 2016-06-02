/// <reference path="typings/main.d.ts" />
'use strict';

import {LoginController} from './controllers/login.controller';
import {SchedulerController} from './controllers/scheduler.controller';
import {InventoryController} from './controllers/inventory.controller';
import {TargetsActualsController} from './controllers/targets-actuals.controller';
import {RetailerController} from './controllers/retailer.controller';
import {AccController} from './controllers/accounts-receivables.controller';
import {TokenService} from './services/token.service';
import {ORMService} from './services/orm.service';

var vPath = require("path");
var vEnv = process.env.NODE_ENV || "development";
var vConfig = require(vPath.join(__dirname, '.', 'config', 'config.json'))[vEnv];
var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
var vValidator = require('validator');
var vSOAP = require('soap');
const PORT: number = process.env.PORT || vConfig.port || 8080;

var vRetailerCtrl:RetailerController = new RetailerController();
var vLoginCtrl:LoginController = new LoginController();
var vSchedCtrl:SchedulerController = new SchedulerController();
var vInventoryCtrl:InventoryController = new InventoryController();
var vTargetsActualsCtrl:TargetsActualsController = new TargetsActualsController();
var vAccCtrl:AccController = new AccController();
var vTokenSvc:TokenService = new TokenService();
var vOrmSvc:ORMService = new ORMService();

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
        pRequest.path !== '/service/login' && 
        pRequest.path !== '/service/login/MPIN' &&
        pRequest.path !== '/service/generateCallPlan' &&
        pRequest.path.indexOf('/testing') !== -1 //bypass token for testing purpose

    ){
        if(pRequest.method !== 'OPTIONS') {
            // all request to service will validate token except login & logout
            var vToken = '';
            try{
                if(pRequest.cookies['accessToken']){//accessed from web
                    vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
                }else{ // accessed from mobile
                    vToken = pRequest.get('Authorization');
                    vToken = vToken.replace('Bearer ','');
                }
                console.log(vToken);
                var jwt = vTokenSvc.verifyToken(vToken);
                pResponse.locals.jwt = jwt;
            }catch(pErr){
                console.log('Error while parsing token : ' + pErr);
                pResponse.sendStatus(403);
            }
        }
    }
    // Sanitize all the parameter send with POST request
    if(pRequest.method === 'POST') {
        for(let param in pRequest.body) {
            pRequest.body[param] = vValidator.escape(pRequest.body[param]);
        }
    }
    pNext();
});

var vRouter = vExpress.Router();
vRouter.post('/login',vLoginCtrl.login);
vRouter.post('/login/MPIN', vLoginCtrl.submitMPIN);
vRouter.get('/logout', vLoginCtrl.logout);
vRouter.get('/retailer/alert',vRetailerCtrl.getAllRetailerAlert);
vRouter.post('/getSalesRoute',vRetailerCtrl.getSalesRoute);
vRouter.post('/getRetailerSummary',vRetailerCtrl.getRetailerSummary);
vRouter.get('/getRetailerAlert',vRetailerCtrl.getAllRetailerAlert);
// vRouter.post('/accountsReceivables',vAccCtrl.accountsReceivables);
// vRouter.post('/retailerSelf',vAccCtrl.retailerSelf);
vRouter.get('/testSync',vSchedCtrl.syncTableMaster);

//API BASED ON GUIDELINES
vRouter.get('/task',vRetailerCtrl.task);
vRouter.post('/retailerCallPreparation',vRetailerCtrl.retailerCallPreparation);
vRouter.post('/loadWallet',vRetailerCtrl.loadWallet);
vRouter.post('/physicalInventory',vRetailerCtrl.physicalInventory);
vRouter.post('/paymentHistory',vRetailerCtrl.paymentHistory);
vRouter.get('/brand',vTargetsActualsCtrl.brand);
vRouter.post('/performance',vTargetsActualsCtrl.performance);
vRouter.post('/additionalRetailerRoute',vRetailerCtrl.additionalRetailerRoute);
vRouter.get('/retailerSummary/:retailerId',vRetailerCtrl.getRetailerSummary);
vRouter.get('/salesRoute/:salesPerson/:day',vRetailerCtrl.getSalesRoute);
vRouter.get('/retailer/accountreceivable',vAccCtrl.accountsReceivables);

vRouter.get('/testSP', vLoginCtrl.testSP);
vRouter.post('/dspPhysicalInventoryList',vInventoryCtrl.dspPhysicalInventoryList);

var vTesting = vExpress.Router();
vTesting.post('/login',vLoginCtrl.login);
vTesting.post('/login/MPIN', vLoginCtrl.submitMPIN);
vTesting.get('/logout', vLoginCtrl.logout);
vTesting.get('/brand',vTargetsActualsCtrl.brand);
vTesting.post('/performance',vTargetsActualsCtrl.performance);
vTesting.get('/retailer/alert',vRetailerCtrl.getAllRetailerAlert);
vTesting.post('/getSalesRoute',vRetailerCtrl.getSalesRoute);
vTesting.post('/getRetailerSummary',vRetailerCtrl.getRetailerSummary);
vTesting.get('/testSync',vSchedCtrl.syncTableMaster);

vApp.use('/service',vRouter);
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