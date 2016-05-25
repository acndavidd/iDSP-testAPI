import {ORMService} from '../services/orm.service';


export class SchedulerController{

	constructor(){
		
	}

	async generateCallPlan(){
		try{
			console.log("Start schedule to generate call plan");

			var vOrmSvc = new ORMService();

			let vParams = {
			};

			var vResult = await vOrmSvc.sp('generate_call_plan', vParams );
			var vResponse = {
						"status" : "Success",
						"errorMessage" : "",
						"result" : vResult
					};
			
			console.log("Schedule generate call plan done with " + vResult + " rows");	
		}
		catch(pErr){
			console.log("Schedule generate call plan done with error message" + pErr);
		}
	}

	async syncTableMaster(pRequest, pResponse){
		try{
			console.log("Start schedule to sync table master");

			var vOrmSvc = new ORMService();

			return vOrmSvc.getSequelize().transaction(function (t){
				
				var promises = [];
				var mst_dist = vOrmSvc.getModel("mst_dist");
				
				promises.push(
					mst_dist.upsert({dist_id: "DIST00001", dist_name: 'joe'}).then(function () {
				       console.log("Upsert success 1");
					})
				);

				promises.push(
					mst_dist.upsert({dist_id: "DIST80001", dist_name: 'joe2'}).then(function () {
				       console.log("Upsert success 2");
					})
				);

				return Promise.all([promises]);
			 }).then(function (result) {
		        // Transaction has been committed
		        pResponse.send("Success Transaction" + ' Time :' + new Date().toLocaleString());
		       	console.log("Start sync table master done");

		    }).catch(function (err) {
		        // Transaction has been rolled back
		        throw err;
			});	
		}
		catch(pErr){
			pResponse.send("Failed to Sync Table " +pErr);
			console.log("Schedule Sync table with error message" + pErr);
		}
	}		
}