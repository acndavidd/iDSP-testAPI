"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class SchedulerController {
    constructor() {
    }
    generateCallPlan() {
        return __awaiter(this, void 0, void 0, function* () {
            // try{
            // 	console.log("Start schedule to generate call plan");
            // 	var vOrmSvc = new ORMService();
            // 	let vParams = {
            // 	};
            // 	var vResult = await vOrmSvc.sp('generate_call_plan', vParams );
            // 	var vResponse = {
            // 				"status" : "Success",
            // 				"errorMessage" : "",
            // 				"result" : vResult
            // 			};
            // 	console.log("Schedule generate call plan done with " + vResult + " rows");	
            // }
            // catch(pErr){
            // 	console.log("Schedule generate call plan done with error message" + pErr);
            // }
        });
    }
    syncTableMaster(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            // try{
            // 	console.log("Start schedule to sync table master");
            // 	var vOrmSvc = new ORMService();
            // 	let vHttpSvc = new APIService.HTTPService();
            // 	var vPromises = [];
            // 	var vSyncVersion = new Date();
            // 	return vOrmSvc.getSequelize().transaction(function (t){
            // 		//Query Start Retrieve MST_DIST
            // 		let vPath:string = '/OPISNET/services/idsp/AllDistributor';
            // 		let vUrlParams = {
            // 			source: "iDSP",
            // 			recordstart: 1,
            // 			recordend: 2
            // 		}
            // 		vSyncVersion = new Date();
            // 		let vDistResult;
            // 		return vHttpSvc.get(APIService.APIType.OPISNET, vPath, null, vUrlParams).then(function(pResult){
            // 			vDistResult = JSON.parse(pResult);
            // 			console.log("sebelum get model");
            // 			var mst_dist = vOrmSvc.getModel("mst_dist");
            // 			console.log("abis get model mst_distribtuor");
            // 			vDistResult.RetailerList.forEach(function(eachDist){
            // 				vPromises.push(
            // 					mst_dist.upsert({
            // 							dist_id: eachDist.DistributorID, 
            // 							dist_name: eachDist.DistributorFirstName + eachDist.DistributorLastName,
            // 							sync_status: 'A',
            // 							sync_version: vSyncVersion
            // 						}, {transaction: t})
            // 				);
            // 			});					
            // 			return Promise.all([vPromises]);
            // 		});
            // 	}).then(function (result) {
            //         // Transaction has been committed
            //         pResponse.send("Success Transaction" + ' Time :' + new Date().toLocaleString());
            //        	console.log("Start sync table master done");
            //     }).catch(function (err) {
            //         // Transaction has been rolled back
            //         throw err;
            // 	});	
            // }
            // catch(pErr){
            // 	pResponse.send("Failed to Sync Table " +pErr);
            // 	console.log("Schedule Sync table with error message" + pErr);
            // }
        });
    }
}
exports.SchedulerController = SchedulerController;
//# sourceMappingURL=scheduler.controller.js.map