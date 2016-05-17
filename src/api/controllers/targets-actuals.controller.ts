'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class TargetsActualsController{


	constructor(){
	}
   
   getBrand(pRequest,pResponse){
	   try{

	   var message = 'Insert start.';
				console.log("mw Init");
	    var orm = new ORMService();
	    var product = orm.getModel("mst_prod_cat");	

	    product.findAll({
		  attributes: ['brand'], 
   			group: ['brand']
		}).then(function(result){

			console.log(result);

			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"brandList" : result

			}
			pResponse.json(vResult);

		}).catch(function (err) {
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}

	getProdCat(pRequest,pResponse){
	   try{

	   var message = 'Insert start.';
				console.log("mw Init");
	    var orm = new ORMService();
	    var product = orm.getModel("mst_prod_cat");	

	    product.findAll({
		  attributes: ['category_name','category_id','brand'], 
   			group: ['category_name','category_id']
		}).then(function(result){	

			console.log(result);

			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"CatList" : result
			}
			pResponse.json(vResult);

		}).catch(function (err) {
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}

	getProduct(pRequest,pResponse){
	   try{

	   var message = 'Insert start.';
	    var orm = new ORMService();
	    var ormS  = orm.getSequelize();
	    var product_cat = orm.getModel("mst_prod_cat");	
	    var product_sub = orm.getModel("mst_prod_sub_cat");
	    var product = orm.getModel("mst_product");
	    var target = orm.getModel("mst_target");
	    var dsp = orm.getModel("mst_dsp");
	    var sales_order = orm.getModel("trx_sales_order");
	    var prd_order = orm.getModel("trx_saleord_prd_det");
	    var load_order = orm.getModel("trx_saleord_load_det");

	    var dateObj = new Date();
		var vmonth = dateObj.getMonth()+1;
		var vyear= dateObj.getFullYear();

	     product_cat.findAll({
	    	  	attributes: ['category_id', 'category_name', 'brand'],
        		include: [{ 
        			model: product_sub, as: 'ProductSubCategory',
          			attributes: ['sub_category_id', 'sub_category_name'],
	        			include :[
						{model : load_order, as :'SalesOrderLoad',
	        			attribute : ['order_id','amount']},


	        			{model: product, as : 'Product',
	        			attributes: ['product_id'],
	        				include:[
	        				{model : prd_order, as:'SalesOrder',
	        					attributes: ['order_id','quantity']
	        				},
	        				{ model: target, as : 'Target',
	        					attributes : [ 'target_qty'],
		        				where: {
					    			dsp_id : 'DSP00001',
					    			target_month : vmonth,
					    			target_year : vyear
			    					}
	        				}]
	        		}]
          		}]

   		 })
    	.then(function(pProdCats) {
			pProdCats = JSON.parse(JSON.stringify(pProdCats)); 
			pProdCats.map(function(pProdCat){ 
                pProdCat.ProductSubCategory.map(function(pProdSubCat){ 
	                let vSumTarget = 0; 
	                let vSumActual = 0;
					if("SalesOrderLoad" in pProdSubCat && pProdSubCat.SalesOrderLoad.length !== 0 ){
						pProdSubCat.SalesOrderLoad.map(function(pOrder){
		            	    vSumActual +=  pOrder.amount;
	                    });
					}
	                pProdSubCat.Product.map(function(pProd){ 
	            		if("SalesOrder" in pProd && pProd.SalesOrder.length !== 0){
	                		pProd.SalesOrder.map(function(pOrder){
	                			vSumActual += pOrder.quantity; 
	                		});
	                	}

	                	if("Target" in pProd && pProd.Target.length !== 0){
	                        pProd.Target.map(function(pTarget){
	                            vSumTarget +=  pTarget.target_qty;
	                        }); 
	                	}
	                }); 
	                pProdSubCat.target_sum = vSumTarget; 
	              	pProdSubCat.actual_sum = vSumActual; 
	                delete pProdSubCat.Product; 
	                delete pProdSubCat.SalesOrderLoad; 
	            }); 
       		}); 
            var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"ProdList" : pProdCats
			}
            pResponse.json(vResult);
		}).catch(function (err) {
			console.log(err);
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}


	getAllRetailerAlert(pRequest,pResponse){
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		let vResult = [];
		var vPromises = [];
		vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer().then(function(retailers){
				retailers.forEach(function(retailer){
					var promise = retailer.getRetailerDSPAlert().then(function(alerts){
						vResult.push({
							retailer_id : retailer.retailer_id,
							retailer_name : retailer.retailer_name,
							retailer_min : retailer.retailer_min,
							alert : alerts
						});
					});
					vPromises.push(promise);
				});
				Promise.all(vPromises).then(function(){
					pResponse.json(vResult);
				});
			});
		});
	}

	getProdSubCat(pRequest,pResponse){
		try{

		var vmessage = 'Insert start.';
	    var vorm = new ORMService();
	    var vprod_cat = vorm.getModel("mst_prod_cat");	
	    var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");	
	     var vprod_cat = vorm.getModel("mst_prod_cat");	
	    
	    vprod_cat_sub.findAll({
	    	  attributes: ['sub_category_id', 'sub_category_name'],
        include: [{ model: vprod_cat, as: 'ProductCategory', required : true,
          attributes: ['category_id', 'category_name' , 'brand']
          		}]
   		 })
    	.then(function(result) {
       	//console.log(result);

			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"SubCatList" : result
			}
			pResponse.json(vResult);
		}).catch(function (err) {
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}

	getCategory(pRequest,pResponse){
		try{

		var vmessage = 'Insert start.';
	    var vorm = new ORMService();
	    var vprod_cat = vorm.getModel("mst_prod_cat");	
	    var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");

	    vprod_cat.findAll({
	    	attributes: ['category_name', 'brand'], 
		})
	    .then(function(result) {	
			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"CategoryList" : result
			}
			pResponse.json(vResult);
		}).catch(function (err) {
		        pResponse.send("Failed to get category" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}

}
