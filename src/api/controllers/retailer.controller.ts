import {ORMService} from '../services/orm.service';

export class RetailerController{
	constructor(){

	}



	getAllRetailerAlert(pRequest,pResponse){
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');

		let vResult = [];
		var vPromises = [];
		vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer({
				attributes : ['retailer_name', 'retailer_min'],
				include : [{
					model : vOrmSvc.getModel('mst_retailer_dsp_alert'),
					as : 'RetailerDSPAlert',
					required : true,
					attributes : ['alert_id' , 'value_segment' , 'threshold_hit' , 'date']
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
				}]
			}).then(function(ret){
				console.log(JSON.stringify(ret));
			});
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