import {ORMService} from '../services/orm.service';


export class RetailerController{
	private vCurrentDate;
	private vDSPID;
	constructor(){
		this.vCurrentDate = new Date().setHours(0,0,0,0);
		this.vDSPID = '1';
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
		let vOrmSvc = new ORMService();
		let vDSPModel = vOrmSvc.getModel('mst_dsp');
		let vResult;
		vDSPModel.findById(this.vDSPID).then(function(dsp){
			dsp.getRetailer({
				attributes : ['retailer_name', 'retailer_min'],
					include : [{
						model : vOrmSvc.getModel('mst_retailer_dsp_alert'),
						as : 'RetailerDSPAlert',
						attributes : ['value_segment' , 'threshold_hit'],
						where : {
							date : { $gt : this.vCurrentDate }
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
	}
}