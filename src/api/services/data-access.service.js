"use strict";
const error_handling_service_1 = require('./error-handling.service');
const sequelize_service_1 = require('./sequelize.service');
class DataAccessService {
    constructor() {
        DataAccessService._errorHandling = new error_handling_service_1.ErrorHandlingService();
    }
    getRouteDay(pSPName, pParams, pIsJSONFormat) {
        console.log('Start Store Procedure get_route_day');
        return this.executeSP(pSPName, pParams, pIsJSONFormat);
    }
    getPhysicalInventory(pSPName, pParams) {
        console.log('Start Store Procedure get_targets_actuals');
        return this.executeSP(pSPName, pParams);
    }
    getBrands(pSPName, pParams) {
        console.log('Start Store Procedure get_brands');
        return this.executeSP(pSPName, pParams);
    }
    getTargetsActuals(pSPName, pParams) {
        console.log('Start Store Procedure get_targets_actuals');
        return this.executeSP(pSPName, pParams);
    }
    getCollection(pSPName, pParams) {
        console.log('Start Store Procedure getCollection');
        return this.executeSP(pSPName, pParams);
    }
    getDropSize(pSPName, pParams) {
        console.log('Start Store Procedure getDropSize');
        return this.executeSP(pSPName, pParams);
    }
    getRetailerSummary(pSPName, pParams) {
        console.log('Start Store Procedure getRetailerSummary');
        return this.executeSP(pSPName, pParams);
    }
    getAccountReceivable(pParams) {
        return this.executeSP(pParams.spName, pParams.spData, pParams.isJson);
    }
    getSalesRoute(pSPName, pParams) {
        console.log('Start Store Procedure getSalesRoute');
    }
    getAdditionalRetailer(pSPName, pParams) {
        console.log('Start Store Procedure get_additional_retailer');
        return this.executeSP(pSPName, pParams);
    }
    getInventoryLoadDsp(pSPName, pParams, pIsJSONFormat) {
        console.log('Start Store Procedure get_inventory_load_dsp');
        return this.executeSP(pSPName, pParams, pIsJSONFormat);
    }
    executeSP(pSPName, pParams, pIsJSONFormat) {
        return new Promise(function (pResolve, pReject) {
            try {
                // build stored procedure params
                let vParams;
                // if we pass a JSON as parameter
                // make sure that the created stored procedure accept 1 param with type of JSON
                if (pIsJSONFormat) {
                    vParams = '(\'' + JSON.stringify(pParams) + '\')';
                }
                else {
                    // default params for stored procedure if null object is passed as parameter
                    // converting params object into parameter in stored procedure
                    if (pParams) {
                        vParams = '(';
                        for (let vParam in pParams) {
                            vParams += "'" + pParams[vParam] + "',";
                        }
                        vParams = vParams.substring(0, vParams.lastIndexOf(',')) + ');';
                    }
                    else {
                        vParams = '();';
                    }
                }
                // build query to execute stored procedure
                let vSQL = 'SELECT ' + pSPName + vParams;
                console.log(vSQL);
                sequelize_service_1.SequelizeService.sequelize.query(vSQL, { type: sequelize_service_1.SequelizeService.sequelize.QueryTypes.SELECT }).then(function (pResult) {
                    // stored procedure will return 0 if there is no errors
                    let vResult = pResult[0][pSPName.toLowerCase()];
                    if (vResult.status === 0) {
                        console.log('REsult' + vResult.result);
                        pResolve(vResult.result);
                    }
                    else {
                        DataAccessService._errorHandling.throwPromiseError(pReject, vResult.error_code, 'STORED_PROCEDURE_ERROR');
                    }
                }).catch(function (pErr) {
                    // throwing error from the sequelize
                    console.log('MASUK CATCH : ' + pErr);
                    DataAccessService._errorHandling.throwPromiseError(pReject, 101, pErr.toString());
                });
            }
            catch (pErr) {
                console.log('MASUK CATCH 2 : ' + pErr);
                DataAccessService._errorHandling.throwPromiseError(pReject, 102, pErr.toString());
            }
        });
    }
}
exports.DataAccessService = DataAccessService;
//# sourceMappingURL=data-access.service.js.map