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

	getAllRetailerAlert(pRequest,pResponse){
		console.log('Enter Controller');
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		let vResult;
		vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer({
				attributes : ['retailer_name', 'retailer_min'],
					include : [{
						model : vOrmSvc.getModel('mst_retailer_dsp_alert'),
						as : 'RetailerDSPAlert',
						required : true,
						attributes : ['value_segment' , 'threshold_hit' , [vOrmSvc.getSequelize().fn('to_char', vOrmSvc.getSequelize().col('date') , 'YYYY/MM/DD'), alert_date ]],
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
					vResult = {
						success : 1,
						result : pResult
					};
					pResponse.json(vResult);
			});
		}).catch(function(pErr){
			vResult = {
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