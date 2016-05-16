'use strict';

import {TokenService} from '../services/token.service';
import {ORMService} from '../services/orm.service';

export class AccController{
	

	constructor(){ 		
	}

	getAccountsReceivables(pRequest,pResponse){
		try{
			let vOrmSvc = new ORMService();
			let vAccModel = vOrmSvc.getModel('trx_sales_order');

			let vResult = [];
			var vPromises = [];
			var vDate = new Date().getDay();
			var vDspId = 'dsp1';

			vAccModel.findAll({
				attributes : ['dsp_id'],
				include : [{
					model : vOrmSvc.getModel('trx_account_receivable'),
					as : 'AccountReceivable',
					required : true,
					attributes : ['amount'],
					where : {dsp_id : vDspId}, 
					include :[{
						model : vOrmSvc.getModel('mst_retailer'),
						as : 'Retailer',
						required : true,
						attributes : ['retailer_name', 'retailer_min'],
						include : [{
							model : vOrmSvc.getModel('mst_route'),
							as : 'Route',
							attributes : ['route_id'],
							include : [{
								model : vOrmSvc.getModel('mst_route_day'),
								as : 'RouteDay',
								required : true,
								where : { route_day : vDate},
								attributes : ['sequence']
							}]
						}]
					}]
				}]
			}).then(function(ret){
				pResponse.json(ret);
			});

		}catch(pErr){
			console.log('Error at AccController: '+pErr);
		}
	}
}