'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class TargetsActualsController{


    constructor(){}
   
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
		var vday = dateObj.getUTCDay();
		var vDaysInMonth = new Date(vyear, vmonth, 0).getDate();

	    var vFirstOfMonth = new Date(vyear, vmonth-1, 1,0,0,0,0);
	    var vLastOfMonth = new Date(vyear, vmonth, 0,11,59,59,59);

	    var used = vFirstOfMonth.getDay() + vLastOfMonth.getDate();
	    var vWeeksInMonth = Math.ceil( used / 7);

	    console.log('aaaaaa'+vFirstOfMonth+'bbb' + vLastOfMonth);

	     product_cat.findAll({
    	  	attributes: ['category_id', 'category_name', 'brand'],
    		include: [{ 
			model: product_sub, 
			as: 'ProductSubCategory',
  			attributes: ['sub_category_id', 'sub_category_name'],
			include :[{
				model: product, 
				as : 'Product',
    			attributes: ['product_id'],
				include:[{
    				model : load_order, 
    				as :'SalesOrderLoad', 
    				required :false,
    				attribute : ['order_id','amount'],
    				include : [{
    					model: sales_order, 
    					as : 'SalesOrderMain',
    					attribute : ['order_id'],
    					where : {order_date : {$between: [vFirstOfMonth,vLastOfMonth]}}
    				}]
				},
				{
					model : prd_order, 
					as:'SalesOrder', 
					required :false,
					attributes: ['order_id','quantity'],
					include : [{
    					model: sales_order, 
    					as : 'SalesOrderMain',
    					attribute : ['order_id'],
    					where : {order_date : {$between: [vFirstOfMonth,vLastOfMonth]}}
					}]
				},
				{
					model: target, 
					as : 'Target', 
					attributes : [ 'target_qty'],
    				where: {
		    			dsp_id : 'DSP00001',
		    			target_month : vmonth,
		    			target_year : vyear
					}
				}]
    		}]
  		}]
  	}).then(function(pProdCats) {
  		pResponse.json(pProdCats);
  		console.log(JSON.stringify(pProdCats));
		pProdCats = JSON.parse(JSON.stringify(pProdCats)); 
		pProdCats.map(function(pProdCat){ 
        pProdCat.ProductSubCategory.map(function(pProdSubCat){ 
	                let vSumTarget = 0; 
	                let vSumActual = 0;
	                let vSumTargetDays = 0;
	                let vSumTargetWeek = 0;
			
	                pProdSubCat.Product.map(function(pProd){ 
	                	if("SalesOrderLoad" in pProd && pProd.SalesOrderLoad.length !== 0 ){
							pProd.SalesOrderLoad.map(function(pOrder){
			            	    vSumActual +=  pOrder.amount;
		                    });

		                    
						}

	            		if("SalesOrder" in pProd && pProd.SalesOrder.length !== 0){
	                		pProd.SalesOrder.map(function(pOrder){
	                			vSumActual += pOrder.quantity; 
	                		});
	                	}

	                	if("Target" in pProd && pProd.Target.length !== 0){
	                        pProd.Target.map(function(pTarget){
	                            vSumTarget +=  pTarget.target_qty;
	                            vSumTargetDays = vSumTarget/vDaysInMonth;
	                            vSumTargetWeek = vSumTarget/vWeeksInMonth;

	                        }); 
	                	}
	                }); 
	                pProdSubCat.target_sum = vSumTarget; 
	              	pProdSubCat.actual_sum = vSumActual; 
	              	pProdSubCat.target_sum_days = Math.ceil(vSumTargetDays); 
	              	pProdSubCat.target_sum_weeks = Math.ceil(vSumTargetWeek); 
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
            //pResponse.json(vResult);
		}).catch(function (err) {
			console.log(err);
		        pResponse.send("Failed to Fetch Data Products" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
			});
		}
		catch(pErr){
			console.log(pErr);
		}
	}

	getProdSubCat(pRequest,pResponse){
		try{
		var vmessage = 'Get Data Starts.';
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
			var vResult = {
				"status" : "Success",
				"statusMessage" : "",
				"error":"error",
				"SubCatList" : result
			}
			pResponse.json(vResult);
		}).catch(function (err) {
		        pResponse.send("Failed to Fetch Data" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
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
