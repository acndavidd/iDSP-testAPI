/// <reference path="typings/main.d.ts" />
'use strict';

import {LoginController} from './controllers/login.controller';
import {InventoryController} from './controllers/inventory.controller';
import {TargetsActualsController} from './controllers/targets-actuals.controller';
import {RetailerController} from './controllers/retailer.controller';
import {AccController} from './controllers/accounts-receivables.controller';
import {TokenService} from './services/token.service';
import {ORMService} from './services/orm.service';

var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
var vSOAP = require('soap');
var vRouter = vExpress.Router();
const PORT:number = process.env.PORT || 8080;

var vRetailerCtrl:RetailerController = new RetailerController();
var vLoginCtrl:LoginController = new LoginController();
var vInventoryCtrl:InventoryController = new InventoryController();
var vTargetsActualsCtrl:TargetsActualsController = new TargetsActualsController();
var vAcc:AccController = new AccController();
var vTokenSvc:TokenService = new TokenService();
var vOrmSvc:ORMService = new ORMService();

vApp.use(vBodyParser.urlencoded({extended: true}));
vApp.use(vBodyParser.json());
vApp.use(vCookieParser());


vApp.use(function(pRequest, pResponse, pNext) {
    /*Allow access control origin*/
    let vAllow: string;
    let vOrigin: string = pRequest.get('origin');
    if (vOrigin == 'http://localhost:3000') {
        vAllow = 'http://localhost:3000';
    }
    if(vAllow) {
         pResponse.header("Access-Control-Allow-Origin", vAllow);
    }
    pResponse.header("Access-Control-Allow-Credentials", "true");
    pResponse.header("Access-Control-Allow-Headers", 
        "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept,Authorization,Proxy-Authorization,X-session");
    pResponse.header("Access-Control-Allow-Methods","GET,PUT,DELETE,POST");

    if(
        pRequest.path !== '/service/login' && 
        pRequest.path !== '/service/logout' &&
        pRequest.path !== '/service/getProductListPhysical' &&
        pRequest.path !== '/service/getBrand' &&
        pRequest.path !== '/service/getAccountsReceivables'
    ){//all request to service will validate token except login
        var vToken = '';
        try{
            if(pRequest.cookies['accessToken']){//accessed from web
                vToken = vCookieParser.JSONCookies(pRequest.cookies).accessToken;
            }else{//accessed from mobile
                vToken = pRequest.get('Authorization');
                vToken = vToken.replace('Bearer ','');
            }
            var jwt = vTokenSvc.verifyToken(vToken);
            pRequest.locals.jwt = jwt;
            if(pRequest.path === '/service/verifyToken'){
                var vResult = {
                    success : 1,
                    token : jwt
                };
                pRequest.json(vResult);
            }
        }catch(err){
            console.log("error : " + err);
            //pResponse.sendStatus(403);
        }      
    }
    pNext();
});

//vRouter.post('/login',vLoginCtrl.login);
vRouter.get('/login',function(pRequest,pResponse){
    /*var vUrl = './wsdl/CurrencyConvertor.asmx.xml';
    var vArgs = { "FromCurrency" : "AFA","ToCurrency" : "IDR"};
    vSOAP.createClient(vUrl,function(pErr,pClient){
        pClient.ConversionRate(vArgs, function(pErr, pResult) {
            pResponse.json(pResult);
        });
    });
    vOrmSvc.getModel('mst_dss').create({
         dss_id : 'qqq',
         dist_id: 'aaa',
         first_name: 'firstname',
         last_name : 'last_name'
     }, {isNewRecord:true};*/
     var prod = vOrmSvc.getModel('mst_product');
     //var prod_sub_cat = vOrmSvc.getModel('mst_prod_sub_category');
     //var prod_cat = vOrmSvc.getModel('mst_product_category');
     
     /*var p1 = prod.create({
         product_id : '10',
         product_name : 'anjay10'
     },{isNewRecord:true}).then(function(res){

     });

     var p2 = prod.create({
         product_id : '11',
         product_name : 'anjay20'
     },{isNewRecord:true});


     prod_sub_cat.findById('1').then(function(psc){
        /*prod.create({
             product_id : '10',
             product_name : 'anjay10'
         },{isNewRecord:true}).then(function(res){
             psc.addProducts(res).then(function(res2){
                 res2.getProducts().then(function(prod){
                    console.log(prod.length);
                });
             });

         });

         psc.createProduct({
             product_id : '11',
             product_name : 'anjay20'
         }).then(function(prod){
             console.log(prod);
         });

     });*/

});

vRouter.get('/getProductListPhysical',vInventoryCtrl.getProductListPhysical);
vRouter.get('/logout',vLoginCtrl.logout);
vRouter.get('/targetsActuals',vTargetsActualsCtrl.getBrand);
vRouter.get('/getRetailerAlert',vRetailerCtrl.getAllRetailerAlert);
vRouter.get('/getAccountsReceivables',vAcc.getAccountsReceivables);
vRouter.get('/getProductCategory',vTargetsActualsCtrl.getProdCat);
vRouter.get('/getProductSubCategory',vTargetsActualsCtrl.getProdSubCat);
vRouter.get('/getProduct',vTargetsActualsCtrl.getProduct);
vRouter.get('/getCategory',vTargetsActualsCtrl.getCategory);
vApp.use('/service',vRouter);
vApp.listen(PORT);
console.log('http://127.0.0.1:' + PORT + '/service');
