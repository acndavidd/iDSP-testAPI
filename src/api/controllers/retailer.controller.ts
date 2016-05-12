import {ORMService} from '../services/orm.service';

export class RetailerController{
	constructor(){

	}

	getAllRetailerAlert(pRequest,pResponse){
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		vDSPModel.findById('1').then(function(dsp){
			dsp.getRetailer().then(function(retailers){
				retailers.forEach(function(retailer){
					retailer.getRetailerDSPAlert().then(function(alerts){
						console.log(JSON.stringify(alerts));
					});
				});
			});
		});
	}
}