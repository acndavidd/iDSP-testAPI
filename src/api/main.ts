/// <reference path="typings/main.d.ts" />
'use strict';
import {SequelizeService} from './services/sequelize.service';
import {AccountController} from './controllers/account/account.controller';
import {InventoryController} from './controllers/inventory.controller';
import {TargetsActualsController} from './controllers/targets-actuals/targets-actuals.controller';
import {RetailerController} from './controllers/retailer/retailer.controller';
import {RetailerThreshold} from './controllers/retailer/threshold/retailer.threshold.controller';
import {AccountReceivableController} from './controllers/retailer/account-receivable/account-receivable.controller';
import {TaskController} from './controllers/task/task.controller';

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
        pRequest.path.indexOf('/service/account') == -1 && // all account service no need forW token
        pRequest.path.indexOf('/testing') == -1 //bypass token for testing purpose
    ){
        if(pRequest.method !== 'OPTIONS') {
            var vToken = '';
            try{
                if(pRequest.cookies['accessToken']){ //accessed from web
                    vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
                }else{ // accessed from mobile
                    vToken = pRequest.get('Authorization');
                    vToken = vToken.replace('Bearer ','');
                }
                // var jwt = vTokenSvc.verifyToken(vToken);
                pResponse.locals.accessToken = vToken;
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

let vRetailerThresholdController = new RetailerThreshold();
vRouter.get('/retailer/threshold', vRetailerThresholdController.getRetailerThreshold);

let vInventoryController =  new InventoryController();
vRouter.get('/inventory/physical',vInventoryController.physical);
vRouter.get('/inventory/load',vInventoryController.load);


let vRetailerController = new RetailerController();
// vRouter.get('/retailer/accountreceivable', vRetailerController.getAccountReceivable);
// vRouter.get('/retailer/accountreceivable', vRetailerController.getAccountReceivable);
// vRouter.get('/task',vRetailerController.task);
// vRouter.get('/retailer/summary',vRetailerController.retailerCallPreparation);
// // vRouter.post('/additionalRetailerRoute',vRetailerController.additionalRetailerRoute);
// vRouter.post('/loadWallet',vRetailerController.loadWallet);
// vRouter.post('/retailer/physicalInventory',vRetailerController.physicalInventory);
// vRouter.post('/retailer/collection',vRetailerController.collection);
vRouter.get('/retailer/threshold', vRetailerController.getRetailerThreshold);
vRouter.get('/retailer/summary',vRetailerController.retailerProfile);
vRouter.get('/retailer/:id/physical',vRetailerController.physicalInventory);
vRouter.get('/retailer/:id/load',vRetailerController.loadWallet);
// vRouter.get('/retailer/accountreceivable', vRetailerController.getAccountReceivable);

let vAccountReceivableController = new AccountReceivableController();
vRouter.get('/retailer/accountreceivable', vAccountReceivableController.getAccountReceivable);
vRouter.get('/retailer/:id/mins', vAccountReceivableController.getRetailerMins);

let vTaskCOntroller = new TaskController();
vRouter.get('/task',vTaskCOntroller.task);

vRouter.post('/additionalRetailerRoute',vTaskCOntroller.additionalRetailerRoute);

vRouter.post('/retailer/collection',vTaskCOntroller.collection);
// define instance of your controller and route here

let vTargetsActualsController =  new TargetsActualsController();
vRouter.get('/brand',vTargetsActualsController.brand);
vRouter.post('/performance',vTargetsActualsController.performance);
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