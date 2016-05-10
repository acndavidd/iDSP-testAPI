/// <reference path="typings/main.d.ts" />
'use strict';

import {LoginController} from './controllers/login.controller';
import {TokenService} from './services/token.service';
import {ORMService} from './services/orm.service';

var vExpress = require('express');
var vApp = vExpress();
var vBodyParser = require('body-parser');
var vCookieParser = require('cookie-parser');
var vSOAP = require('soap');
var vRouterSvc = vExpress.Router();
var vRouterAdm = vExpress.Router();
const PORT:number = process.env.PORT || 8080;

var vLoginCtrl:LoginController = new LoginController();
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

    if(pRequest.path !== '/service/login' && pRequest.path.indexOf('/admin') == -1){//all request to service will validate token except login
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
            pResponse.sendStatus(403);
        }      
    }
    pNext();
});

//migrations function
vRouterAdm.get('/buildModels', vOrmSvc.buildModels);

//vRouter.post('/login',vLoginCtrl.login);
vRouterSvc.get('/login',function(pRequest,pResponse){
    vOrmSvc.getModel('mst_sync_version').create({
        table_name: 'anjay',
        table_description: 'anjay desc'
        }, {isNewRecord : true});
    });
    /*var vUrl = './wsdl/CurrencyConvertor.asmx.xml';
    var vArgs = { "FromCurrency" : "AFA","ToCurrency" : "IDR"};
    vSOAP.createClient(vUrl,function(pErr,pClient){
        pClient.ConversionRate(vArgs, function(pErr, pResult) {
            pResponse.json(pResult);
        });
    });*/
vRouterSvc.get('/logout',vLoginCtrl.logout);

vApp.use('/service',vRouterSvc);
vApp.use('/admin',vRouterAdm);
vApp.listen(PORT);
console.log('http://127.0.0.1:' + PORT + '/service');
