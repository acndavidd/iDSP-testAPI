'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';
import {APIService} from '../services/api.service';

export interface LoginInterface {
	login(pRequest, pResponse): Promise<void>;
	submitMPIN(pRequest, pResponse): Promise<void>;
	verifyToken(pRequest, pResponse): void;
	logout(pRequest, pResponse): Promise<void>
	test(pRequest, pResponse): Promise<void>;
}

export class LoginController implements LoginInterface{
	
	constructor() {
	}

	async login(pRequest,pResponse) {
		let vHttpSvc = new APIService.HTTPService();
		let vPath:string = '/OPISNET/services/idsp/userValidation';
		let vData = {
			Username : pRequest.body.Username,
			Password : pRequest.body.Password
		};
		let vResult = JSON.parse(await vHttpSvc.post(APIService.APIType.OPISNET, vPath, null, vData));
		pResponse.json(vResult);
	}

	async submitMPIN(pRequest, pResponse) {
		let vHttpSvc = new APIService.HTTPService();
		let vTokenSvc = new TokenService();
		let vPath:string = '/OPISNET/services/idsp/userAuthorization';
		let vData = {
			Username : pRequest.body.Username,
			MPIN : pRequest.body.MPIN
		};
		let vResult = JSON.parse(await vHttpSvc.post(APIService.APIType.OPISNET, vPath, null, vData));
		// If success login , generate token for services
		if(vResult.Status === 200) {
			let vTokenObj = {
				DSP_ID : pRequest.body.Username,
				AccessToken : vResult.AccessToken
			};
			vResult.accessToken = vTokenSvc.generateToken(vTokenObj);
			// Set Cookie session for web access
			pResponse.cookie('accessToken', vResult.accessToken,{httpOnly:true});
			// console.log(pRequest.cookie.accessToken);
		}
		pResponse.json(vResult);
	}

	verifyToken(pRequest, pResponse) {
		let vTokenSvc = new TokenService();
		let vResult = {
			Status : 200,
			StatusMessage : "Success Bro",
			TokenObject : pResponse.locals.jwt
		};
		pResponse.json(vResult);
	}

	async logout(pRequest, pResponse) {
		let vResult = {
			Status : 200,
			StatusMessage : "Success Bro"
		};
		pResponse.clearCookie('accessToken');
		pResponse.json(vResult);
	}

	test(pRequest,pResponse){
		try{
			var message = 'Insert start.';
			console.log("mw Init");

			var orm = new ORMService();
			console.log("mw map mode");

			var vOrder_id;

			return orm.getSequelize().transaction(function (t){
				var sales_order_new = orm.getModel("trx_sales_order");

				return sales_order_new.create({
		            dsp_id: 'DSP01',
			 	    retailer_id: 'RET01',
			 	    total_amount: 1000000
		        }, {transaction: t}).then(function(so){		        	
		            vOrder_id = so.get("order_id");
		            console.log("Successfully insert "+ vOrder_id);

		            var unserve1 = orm.getModel('trx_unserved_order');
		            var promises = [];

		            
		            promises.push(
		            	unserve1.create({
			                order_id:vOrder_id,
					        product_id: 'P00001',
					 	    quantity: 10,
					 	    remarks: 'YO MAMEN 1'
			            }, {transaction: t})
			        );

			        promises.push(
		            	unserve1.create({
			                order_id:vOrder_id,
					        product_id: 'P00002',
					 	    quantity: 100,
					 	    remarks: 'YO MAMEN 2'
			            }, {transaction: t})
			        );

			        console.log("start hit promise");
		            return Promise.all([
		            	promises
		            ]);


		        });

			 }).then(function (result) {
		        // Transaction has been committed
		        // result is whatever the result of the promise chain returned to the transaction callback
		        //console.log(t.)
		        pResponse.send("Success Transaction" + ' Time :' + new Date().toLocaleString() + " with ID : " + vOrder_id);

		        //Sample query and get Children and get 
			    var so = orm.getModel("trx_sales_order");	

			    so.find({
				    where: { order_id: vOrder_id}
				}).then(function(match){
				  	match.getSalesOrderUnserved().then(function(resultUnserved){
					console.log(resultUnserved.length);
				    console.log(resultUnserved[0].get("product_id"));
				    console.log(resultUnserved[1].get("product_id"));
					});
				});

				var unSo = orm.getModel("trx_unserved_order");

				unSo.find({
				    where: { order_id: vOrder_id}
				}).then(function(match){
				   	match.getSalesOrder().then(function(resultSO){
					console.log(resultSO.get("retailer_id"));
		    		});
				});  

		    }).catch(function (err) {
		        // Transaction has been rolled back
		        // err is whatever rejected the promise chain returned to the transaction callback
		        //t.rollback();
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}
}