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
}