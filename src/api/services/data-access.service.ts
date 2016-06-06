import {ErrorHandlingService} from './error-handling.service';
import {SequelizeService} from './sequelize.service';

export interface DataAccessInterface {
	executeSP(pSPName: string, pParams: any, pIsJSONFormat?: boolean): Promise<string>;
	getRouteDay(pSPName,pParams,pIsJSONFormat);
	getBrands(pSPName,pParams,pIsJSONFormat);
	getTargetsActuals(pSPName,pParams,pIsJSONFormat);
	getPhysicalInventory(pSPName,pParams,pIsJSONFormat);
	getCollection(pSPName,pParams,pIsJSONFormat);
	getAccReceivable(pParams);
}

export class DataAccessService implements DataAccessInterface {
	private static _errorHandling:ErrorHandlingService;
	
	constructor() {
		DataAccessService._errorHandling = new ErrorHandlingService();
	}

	getRouteDay(pSPName,pParams,pIsJSONFormat) {
		console.log('Start Store Procedure get_route_day');
		return this.executeSP(pSPName,pParams,pIsJSONFormat);
	}

	getPhysicalInventory(pSPName,pParams) {
		console.log('Start Store Procedure get_targets_actuals');
		return this.executeSP(pSPName,pParams);
	}

	getBrands(pSPName,pParams,pIsJSONFormat) {
		console.log('Start Store Procedure get_brands');
		return this.executeSP(pSPName,pParams,pIsJSONFormat);
	}

	getTargetsActuals(pSPName,pParams) {
		console.log('Start Store Procedure get_targets_actuals');
		return this.executeSP(pSPName,pParams);
	}
	
	getCollection(pSPName,pParams) {
		console.log('Start Store Procedure get_targets_actuals');
		return this.executeSP(pSPName,pParams);
	}

	executeSP(pSPName:string, pParams: any, pIsJSONFormat?: boolean): Promise<string> {
		return new Promise<string>(
			function(pResolve, pReject) {
				try{
					// build stored procedure params
					let vParams;
					
					// if we pass a JSON as parameter
					// make sure that the created stored procedure accept 1 param with type of JSON
					if(pIsJSONFormat) {
						vParams = '(\''+JSON.stringify(pParams)+'\')';
					}else {
						// default params for stored procedure if null object is passed as parameter
						vParams = '(';
						// converting params object into parameter in stored procedure
						if(pParams) {
<<<<<<< HEAD
							vParams = '(';
=======
							vParams = '';
>>>>>>> 17f68e4fb0e1bb2fa4255d324e5eff32fa2df4ea
							for(let vParam in pParams){
								vParams += "'" + pParams[vParam] + "',";
							}
							vParams = vParams.substring(0,vParams.lastIndexOf(',')) + ');';
						}
					}
					// build query to execute stored procedure
					let vSQL = 'SELECT ' + pSPName + vParams;
					console.log(vSQL);
					SequelizeService.sequelize.query(vSQL, { type: SequelizeService.sequelize.QueryTypes.SELECT }).then(function(pResult){
						// stored procedure will return 0 if there is no errors
						let vResult = pResult[0][pSPName.toLowerCase()];
						if(vResult.status === 0) {
							pResolve(vResult.result);
						// functional error occured while execute the stored procedure
						}else {
							DataAccessService._errorHandling.throwPromiseError(pReject, vResult.error_code, 'STORED_PROCEDURE_ERROR');
						}
					}).catch(function(pErr){
						// throwing error from the sequelize
						DataAccessService._errorHandling.throwPromiseError(pReject, 101, pErr.toString());
					});
				}catch(pErr) {
					DataAccessService._errorHandling.throwPromiseError(pReject, 102, pErr.toString());
				}
			}
		);
	}

	getAccReceivable(pParams) {
		return this.executeSP(pParams.spName, pParams.spData, pParams.isJson);
	}
}