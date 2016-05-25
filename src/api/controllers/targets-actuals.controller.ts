'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class TargetsActualsController{


    constructor(){}
   
    async brands(pRequest,pResponse){
	    try {	  
		    var message = 'Insert start.';

		    console.log("Start getting brands");
			var vOrmSvc = new ORMService();
			
			var vResult = await vOrmSvc.sp('get_brands', null);
			console.log("Query Brands with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"brandList" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr) {
			console.log(pErr);
		}
	}

	// productCategories(pRequest,pResponse){
	//    try{

	//    var message = 'Insert start.';
	// 			console.log("mw Init");
	//     var orm = new ORMService();
	//     var product = orm.getModel("mst_prod_cat");	

	//     product.findAll({
	// 	  attributes: ['category_name','category_id','brand'], 
 //   			group: ['category_name','category_id']
	// 	}).then(function(result){	

	// 		console.log(result);

	// 		var vResult = {
	// 			"status" : "Success",
	// 			"statusMessage" : "",
	// 			"error":"error",
	// 			"CatList" : result
	// 		}
	// 		pResponse.json(vResult);

	// 	}).catch(function (err) {
	// 	        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
	// 		});
	// 	}
	// 	catch(pErr){
	// 		console.log(pErr);
	// 	}
	// }

	async targetsActuals(pRequest,pResponse){
	   try{	  
		    var message = 'Insert start.';

		    console.log("Start targets actuals");
			var vSalesPerson = pRequest.body.salesPerson;
			var vSelectedType = pRequest.body.actualType;
			var vSelectedBrand = pRequest.body.brand;
			var vOrmSvc = new ORMService();

			let vParams = {
				sales_person : vSalesPerson,
				type : vSelectedType,
				brand : vSelectedBrand
			};

			var vResult = await vOrmSvc.sp('get_target_actuals', vParams );
			console.log("Query Done with result : "+ JSON.stringify(vResponse));
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			pResponse.json(vResponse);
		}
		catch(pErr)
		{
			console.log(pErr);
		}
	}

	// productSubCategories(pRequest,pResponse){
	// 	try{
	// 	var vmessage = 'Get Data Starts.';
	//     var vorm = new ORMService();
	//     var vprod_cat = vorm.getModel("mst_prod_cat");	
	//     var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");	
	//      var vprod_cat = vorm.getModel("mst_prod_cat");	
	    
	//     vprod_cat_sub.findAll({
	//     	  attributes: ['sub_category_id', 'sub_category_name'],
 //        include: [{ model: vprod_cat, as: 'ProductCategory', required : true,
 //          attributes: ['category_id', 'category_name' , 'brand']
 //          		}]
 //   		 })
 //    	.then(function(result) {
	// 		var vResult = {
	// 			"status" : "Success",
	// 			"statusMessage" : "",
	// 			"error":"error",
	// 			"SubCatList" : result
	// 		}
	// 		pResponse.json(vResult);
	// 	}).catch(function (err) {
	// 	        pResponse.send("Failed to Fetch Data" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
	// 		});
	// 	}
	// 	catch(pErr){
	// 		console.log(pErr);
	// 	}
	// }

	// getCategory(pRequest,pResponse){
	// 	try{
	// 	var vmessage = 'Insert start.';
	//     var vorm = new ORMService();
	//     var vprod_cat = vorm.getModel("mst_prod_cat");	
	//     var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");

	//     vprod_cat.findAll({
	//     	attributes: ['category_name', 'brand'], 
	// 	})
	//     .then(function(result) {	
	// 		var vResult = {
	// 			"status" : "Success",
	// 			"statusMessage" : "",
	// 			"error":"error",
	// 			"CategoryList" : result
	// 		}
	// 		pResponse.json(vResult);
	// 	}).catch(function (err) {
	// 	        pResponse.send("Failed to get category" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
	// 		});
	// 	}
	// 	catch(pErr){
	// 		console.log(pErr);
	// 	}
	// }

}
