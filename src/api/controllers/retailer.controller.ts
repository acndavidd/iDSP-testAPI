import {ORMService} from '../services/orm.service';

export class RetailerController{
	constructor(){

	}



	getAllRetailerAlert(pRequest,pResponse){
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		let vResult = [];
		var vPromises = [];
		/*vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer().then(function(retailers){
				retailers.forEach(function(retailer){
					console.log(retailer);
					retailer.getRouteDay().then(function(routes){
						console.log(route);
					});
				});
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