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
var vSOAP = require('soap');
var vRouter = vExpress.Router();
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
        pRequest.path !== '/service/submitMPIN' &&
        pRequest.path !== '/service/generateCallPlan'

    ){
        // all request to service will validate token except login & logout
        var vToken = '';
        try{
            if(pRequest.cookies['accessToken']){//accessed from web
                vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
            }else{ // accessed from mobile
                vToken = pRequest.get('Authorization');
                vToken = vToken.replace('Bearer ','');
            }
            var jwt = vTokenSvc.verifyToken(vToken);
            pResponse.locals.jwt = jwt;
        }catch(err){
            console.log('error : ' + err);
            pResponse.sendStatus(403);
        }      
    }
    pNext();
});

vRouter.post('/login',vLoginCtrl.login);
vRouter.post('/submitMPIN', vLoginCtrl.submitMPIN);
vRouter.get('/verifyToken', vLoginCtrl.verifyToken);
vRouter.get('/logout', vLoginCtrl.logout);

vRouter.get('/getProductListPhysical',vInventoryCtrl.getProductListPhysical);
vRouter.get('/targetsActuals',vTargetsActualsCtrl.getBrand);
vRouter.get('/getRetailerAlert',vRetailerCtrl.getAllRetailerAlert);
vRouter.post('/getAccountsReceivables',vAccCtrl.getAccountsReceivables);

vRouter.get('/getProductCategory',vTargetsActualsCtrl.getProdCat);
vRouter.get('/getProductSubCategory',vTargetsActualsCtrl.getProdSubCat);

vRouter.post('/getProduct',vTargetsActualsCtrl.getProduct);

vRouter.get('/getCategory',vTargetsActualsCtrl.getCategory);


vRouter.post('/getSalesRoute',vRetailerCtrl.getSalesRoute);
vRouter.post('/getRetailerRouteBCP',vRetailerCtrl.getRetailerRouteBCP);
vRouter.post('/getRetailerCallPrep',vRetailerCtrl.getRetailerCallPrep);
vRouter.post('/getLoadWallet',vRetailerCtrl.getLoadWallet);
vRouter.post('/getPhysicalInventory',vRetailerCtrl.getPhysicalInventory);
vRouter.post('/getPaymentHistory',vRetailerCtrl.getPaymentHistory);


vRouter.post('/getRetailerSummary',vRetailerCtrl.getRetailerSummary);
vRouter.get('/testSync',vSchedCtrl.syncTableMaster);

vApp.use('/service',vRouter);
vApp.listen(PORT);

var CronJob = require('cron').CronJob;
    var job = new CronJob('* * 0 * * *', function() {
        console.log('Start Running scheduler for generate call plan');
        vSchedCtrl.generateCallPlan();
    }, function () {

    }, true, 'Asia/Manila');



console.log('http://127.0.0.1:' + PORT + '/service');
