/// <reference path="typings/main.d.ts" />
'use strict';
const sequelize_service_1 = require('./services/sequelize.service');
const account_controller_1 = require('./controllers/account/account.controller');
const inventory_controller_1 = require('./controllers/inventory.controller');
const global_controller_1 = require('./controllers/global.controller');
const targets_actuals_controller_1 = require('./controllers/targets-actuals/targets-actuals.controller');
const retailer_controller_1 = require('./controllers/retailer/retailer.controller');
const account_receivable_controller_1 = require('./controllers/retailer/account-receivable/account-receivable.controller');
const task_controller_1 = require('./controllers/task/task.controller');
const remittance_controller_1 = require('./controllers/remittance.controller');
const load_transfer_controller_1 = require('./controllers/retailer/salesorder/load-transfer.controller');
const retailer_sales_order_controller_1 = require('./controllers/retailer/salesorder/retailer-sales-order.controller');
const collection_controller_1 = require('./controllers/retailer/collection/collection.controller');
var vPath = require("path");
var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
var vConfig = require(vPath.join(__dirname, '.', 'config', 'config.json'))[vEnv];
var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
var vValidator = require('validator');
var vSOAP = require('soap');
const PORT = process.env.PORT || vConfig.port || 8080;
vApp.use(vBodyParser.urlencoded({ extended: true }));
vApp.use(vBodyParser.json());
vApp.use(vCookieParser());
vApp.use(function (pRequest, pResponse, pNext) {
    // Allow access control origin
    let vAllow;
    let vOrigin = pRequest.get('origin');
    if (vOrigin == 'http://localhost:3000') {
        vAllow = 'http://localhost:3000';
    }
    if (vAllow) {
        pResponse.header('Access-Control-Allow-Origin', vAllow);
    }
    pResponse.header('Access-Control-Allow-Credentials', 'true');
    pResponse.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session');
    pResponse.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST');
    if (pRequest.path.indexOf('/service/account') !== -1 &&
        pRequest.path.indexOf('/testing') !== -1 //bypass token for testing purpose
    ) {
        if (pRequest.method !== 'OPTIONS') {
            // all request to service will validate token except login & logout
            var vToken = '';
            try {
                if (pRequest.cookies['accessToken']) {
                    vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
                }
                else {
                    vToken = pRequest.get('Authorization');
                    vToken = vToken.replace('Bearer ', '');
                }
            }
            catch (pErr) {
                console.log('asdadasdasd 7');
                pResponse.sendStatus(403);
            }
        }
    }
    // Sanitize all the parameters send with POST request
    if (pRequest.method === 'POST') {
        for (let param in pRequest.body) {
            pRequest.body[param] = vValidator.escape(pRequest.body[param]);
        }
    }
    pNext();
});
var vRouter = vExpress.Router();
// Open connection pool for database access using sequelize
let vSequelizeService = new sequelize_service_1.SequelizeService();
let vAccountController = new account_controller_1.AccountController();
vRouter.post('/account', vAccountController.authenticate);
vRouter.post('/account/:id/MPIN', vAccountController.submitMPIN);
vRouter.get('/account/logout', vAccountController.logout);
vRouter.post('/account/test', vAccountController.testSP);
let vInventoryController = new inventory_controller_1.InventoryController();
vRouter.get('/inventory/physical', vInventoryController.physical);
vRouter.get('/inventory/load', vInventoryController.load);
let vRemittanceController = new remittance_controller_1.RemittanceController();
vRouter.get('/remittance', vRemittanceController.getRemittancesDetail);
let vRetailerController = new retailer_controller_1.RetailerController();
vRouter.get('/retailer/:id/lastamounttransferred', vRetailerController.lastAmountTransferred);
vRouter.get('/retailer/threshold', vRetailerController.getRetailerThreshold);
vRouter.get('/retailer/summary', vRetailerController.retailerProfile);
vRouter.get('/retailer/:id/physical', vRetailerController.physicalInventory);
vRouter.get('/retailer/:id/load', vRetailerController.loadWallet);
vRouter.get('/retailer/:id/outstandingBalance', vRetailerController.outstandingBalance);
// vRouter.get('/retailer/:id/additional',vRetailerController.additionalRetailer);
let vLoadTransferController = new load_transfer_controller_1.LoadTransferController();
vRouter.get('/retailer/:id/suggestedorder', vLoadTransferController.getSuggestedOrder);
vRouter.post('/retailer/balance', vLoadTransferController.getCurrentBalance);
let vRetailerSalesOrderController = new retailer_sales_order_controller_1.RetailerSalesOrderController();
vRouter.post('/retailer/:id/salesorder', vRetailerSalesOrderController.newSalesOrder);
let vAccountReceivableController = new account_receivable_controller_1.AccountReceivableController();
vRouter.get('/retailer/accountreceivable', vAccountReceivableController.getAccountReceivable);
vRouter.get('/retailer/:id/mins', vAccountReceivableController.getRetailerMins);
let vCollectionController = new collection_controller_1.CollectionController();
vRouter.get('/retailer/:retailid/collection', vCollectionController.getCollection);
let vTaskCOntroller = new task_controller_1.TaskController();
vRouter.get('/task', vTaskCOntroller.task);
vRouter.post('/additionalRetailerRoute', vTaskCOntroller.additionalRetailerRoute);
vRouter.get('/retailer/:id/collection', vTaskCOntroller.collection);
// define instance of your controller and route here
let vTargetsActualsController = new targets_actuals_controller_1.TargetsActualsController();
vRouter.post('/performance', vTargetsActualsController.performance);
let vGlobalController = new global_controller_1.GlobalController();
vRouter.get('/brand', vGlobalController.brand);
vRouter.get('/productID', vGlobalController.productID);
// let aa = new aa();
// vRouter.method('/aa', aa.bb);
// let bb = new bb();
// vRouter.method('/bb' bb.aa);
vApp.use('/service', vRouter);
// for testing purpose, will not validate token
var vTesting = vRouter;
vApp.use('/testing', vTesting);
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
//# sourceMappingURL=main.js.map