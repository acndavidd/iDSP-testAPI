/// <reference path="typings/main.d.ts" />
'use strict';
import {SequelizeService} from './services/sequelize.service';
import {AccountController} from './controllers/account/account.controller';
import {InventoryController} from './controllers/inventory.controller';
import {GlobalController} from './controllers/global.controller';
import {TargetsActualsController} from './controllers/targets-actuals/targets-actuals.controller';
import {RetailerController} from './controllers/retailer/retailer.controller';
import {AccountReceivableController} from './controllers/retailer/account-receivable/account-receivable.controller';
import {TaskController} from './controllers/task/task.controller';
import {RemittanceController} from './controllers/remittance.controller';
import {LoadTransferController} from './controllers/retailer/salesorder/load-transfer.controller';
import {RetailerSalesOrderController} from './controllers/retailer/salesorder/retailer-sales-order.controller';
import {CollectionController} from './controllers/retailer/collection/collection.controller';

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
                console.log('asdadasdasd 7');
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

let vInventoryController =  new InventoryController();
vRouter.get('/inventory/physical',vInventoryController.physical);
vRouter.get('/inventory/load',vInventoryController.load);

let vRemittanceController = new RemittanceController();
vRouter.get('/remittance', vRemittanceController.getRemittancesDetail);

let vRetailerController = new RetailerController();
vRouter.get('/retailer/threshold', vRetailerController.getRetailerThreshold);
vRouter.get('/retailer/summary',vRetailerController.retailerProfile);
vRouter.get('/retailer/:id/physical',vRetailerController.physicalInventory);
vRouter.get('/retailer/:id/load',vRetailerController.loadWallet);
// vRouter.get('/retailer/:id/additional',vRetailerController.additionalRetailer);

let vLoadTransferController = new LoadTransferController();
vRouter.get('/retailer/:id/suggestedorder', vLoadTransferController.getSuggestedOrder);
vRouter.post('/retailer/balance', vLoadTransferController.getCurrentBalance);

let vRetailerSalesOrderController = new RetailerSalesOrderController();
vRouter.post('/retailer/:id/salesorder', vRetailerSalesOrderController.newSalesOrder);

let vAccountReceivableController = new AccountReceivableController();
vRouter.get('/retailer/accountreceivable', vAccountReceivableController.getAccountReceivable);
vRouter.get('/retailer/:id/mins', vAccountReceivableController.getRetailerMins);

let vCollectionController = new CollectionController();
vRouter.get('/retailer/:retailid/collection',vCollectionController.getCollection);

let vTaskCOntroller = new TaskController();
vRouter.get('/task',vTaskCOntroller.task);
vRouter.post('/additionalRetailerRoute',vTaskCOntroller.additionalRetailerRoute);
// define instance of your controller and route here

let vTargetsActualsController =  new TargetsActualsController();
vRouter.post('/performance',vTargetsActualsController.performance);


let vGlobalController =  new GlobalController();
vRouter.get('/brand',vGlobalController.brand);
vRouter.get('/productID',vGlobalController.productID);
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