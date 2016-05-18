'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class LoginController{
	
	constructor(){
	}

	login(pRequest,pResponse){
		try{
			let vTokenSvc = new TokenService();
			var vTokenObj = {
				user : {
					name : pRequest.body.username,
					password : pRequest.body.password
				}
			};
			var vResult = {
				success : 1,
				token : vTokenSvc.generateToken(vTokenObj)
			};
			pResponse.cookie('accessToken',vResult.token,{httpOnly:true});
		}catch(err){
			var vResult = {
				success : 0,
				token   : ''
			};
		}
		pResponse.json(vResult);
	}
	logout(pRequest,pResponse){
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