import {ORMService} from '../services/orm.service';


export class RetailerController{
	constructor(){

	}
	
	getProduct(pRequest,pResponse){
		let vOrmSvc = new ORMService();
		let vProdCatModel = vOrmSvc.getModel('mst_prod_cat');
		vProdCatModel.findAll({
			attributes : ['category_name' , 'brand'],
			include : [{
				model : vOrmSvc.getModel('mst_prod_sub_cat'),
				as : 'ProductSubCategory',
				required : true,
				attributes : ['sub_category_name'],
				include : [{
					model : vOrmSvc.getModel('mst_product'),
					attributes : ['product_id'],
					as : 'Product',
					required : true,
					include : [{
						model : vOrmSvc.getModel('mst_target'),
						as : 'Target',
						attributes : ['target_qty'],
						required : true,
					}]
				}]
			}]
		}).then(function(pProdCats){
			pProdCats = JSON.parse(JSON.stringify(pProdCats));
			pProdCats.map(function(pProdCat){
				pProdCat.ProductSubCategory.map(function(pProdSubCat){
					let vSumTarget = 0;
					pProdSubCat.Product.map(function(pProd){
						vSumTarget += pProd.Target.reduce(function(pPrevVal,pCurrVal){
							return  pPrevVal.target_qty + pCurrVal.target_qty;
						}).target_qty;
						delete pProd.Target;
					});
					pProdSubCat.target_sum = vSumTarget;
					delete pProdSubCat.Product;
				});
			});
			pResponse.json(pProdCats);
		});
	}

	getRetailerSummary(pRequest, pResponse){
		try{
			console.log("Start getting retailer detail");
			var vSelectedRetailId = pRequest.body.retailerId;
			var vCurrentDate = new Date().setHours(0,0,0,0);
			var vArStatusPaid = 'Paid';

		    var vOrmSvc = new ORMService();
		    var vSequelize = vOrmSvc.getSequelize(); 
			var vRetailer = vOrmSvc.getModel("mst_retailer");
			var vDspAlert = vOrmSvc.getModel("mst_retailer_dsp_alert");
			var vAccountReceivable = vOrmSvc.getModel("trx_account_receivable");

			//Query REtailer
			vRetailer.findOne({
				attributes:	['retailer_id','retailer_name','retailer_min',
							 'owner_first_name',
							 'retailer_address','civil_status','email',
							 'gender','birthday'
							],
				where: {
						retailer_id : vSelectedRetailId						
				}				
			}).then(function (pResRetailer){
				
				var listPromise=[];
				var vResAr;
				var vResAlert;

				//Query Alert
				listPromise.push(pResRetailer.getRetailerDSPAlert({
						attributes : ['value_segment','threshold_hit'],
						order : [['date','DESC']],
						where : {
							date : {
								$gt: vCurrentDate
							}
						},	
						limit : 1				
					}).then(function (pResAlert)
					{	
						console.log("Alert is Found" + JSON.stringify(pResAlert));
						 vResAlert = pResAlert;
					})
				);

				//Query AR
				listPromise.push(pResRetailer.getAccountReceivable({
					attributes : ['amount'],
					where : { 
						status : {
							$ne: vArStatusPaid
						}
					}
					}).then(function (pResAccount)
					{	
						console.log("AR is Found" + JSON.stringify(pResAccount));
						vResAr = pResAccount;
					})
				);

				Promise.all(listPromise).then(function(){

					var vttlAccountReceivable = 0;
					for(var i = 0; i < vResAr.length; i++) {
					    vttlAccountReceivable = vttlAccountReceivable + vResAr[i].amount;
					}

					if (vResAlert.length == 0)
					{
						vResAlert = null;
					}

					var vResult = {
					"status" : "Success",
					"errorMessage" : "",
					"result" : {
						retailer : pResRetailer,
						alert : vResAlert,
						total_ar : vttlAccountReceivable
						}
					};

					console.log("Query Done with result : "+ JSON.stringify(vResult));
					pResponse.json(vResult);
				});
			}).catch(function (pErr) {
				console.log(pErr)		        
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + pErr);
			});
			
		}
		catch(pErr){
			console.log(pErr);
			pResponse.send("Failed to Hit");
		}
	}

	getSalesRoute(pRequest, pResponse){
		try{
			console.log("Start getting sales route");
			var vSelectedDay = pRequest.body.day;
			var vSalesPerson = pRequest.body.salesPerson;

		    var vOrmSvc = new ORMService();
		    var vSequelize = vOrmSvc.getSequelize(); 
		    var vRoute = vOrmSvc.getModel("mst_route");	
			var vRouteDay = vOrmSvc.getModel("mst_route_day");
			var vRetailer = vOrmSvc.getModel("mst_retailer");

			vRetailer.findAll({
				attributes:	['retailer_id','retailer_name','retailer_min',
							 'owner_first_name',
							 'retailer_address','civil_status','email',
							 'gender','birthday'
							],
				where: {dsp_id : vSalesPerson},
				include: [
					{	model: vRoute, as: 'Route', attributes:['route_id'], required: true, 
						include: [{model: vRouteDay, as: 'RouteDay', attributes:['sequence'], where : {route_day : vSelectedDay}}]
					}					
				],
				order: [[vSequelize.col('sequence', 'Route.RouteDay'), 'DESC NULLS LAST']]				
			}).then(function (pResult){
				var vResult = {
				"status" : "Success",
				"errorMessage" : "",
				"result" : pResult
				};

				console.log("Query Done with result : "+ JSON.stringify(pResult));

				pResponse.json(vResult);
			}).catch(function (pErr) {
				console.log(pErr)		        
		        pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + pErr);
			});
		}
		catch(pErr){
			console.log(pErr);
			pResponse.send("Failed to Hit");
		}
	}

	getAllRetailerAlert(pRequest,pResponse){
		console.log('Enter Controller');
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer({
				attributes : ['retailer_name', 'retailer_min'],
					include : [{
						model : vOrmSvc.getModel('mst_retailer_dsp_alert'),
						as : 'RetailerDSPAlert',
						required : true,
						attributes : ['value_segment' , 'threshold_hit' , [vOrmSvc.getSequelize().fn('to_char', vOrmSvc.getSequelize().col('date') , 'YYYY/MM/DD'), 'alert_date' ]],
						where : {
							alert_date : vOrmSvc.getSequelize().fn('to_char', vOrmSvc.getSequelize().fn('NOW') , 'YYYY/MM/DD')
						}
					},
					{
						model : vOrmSvc.getModel('mst_route'),
						as : 'Route',
						attributes : ['route_id'],
						include : [{
							model : vOrmSvc.getModel('mst_route_day'),
							as : 'RouteDay',
							attributes : ['route_day','sequence']
						}]
					}],
				}).then(function(pResult){
					var vResult = {
						success : 1,
						result : pResult
					};
					pResponse.json(vResult);
			});
		}).catch(function(pErr){
			var vResult = {
				success : 0,
				error : pErr
			}
			pResponse.json(vResult);
		});
		
		/*
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
		*/
	}
}