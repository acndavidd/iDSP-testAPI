'use strict';

import {TokenService} from '../services/token.service';
import {APIService} from '../services/api.service';
import {ErrorHandlingService} from '../services/error-handling.service';
import {DataAccessService} from '../services/data-access.service';
import {RemittanceOutputModel} from '../models/output/remittance.model';

export interface RemittanceInterface {
    getRemittancesDetail(pRequest, pResponse): Promise<void>;
}

export class RemittanceController implements RemittanceInterface {

    private static _errorHandling: ErrorHandlingService;
    private static _httpService: APIService.HTTPService;
    private static _dataAccess: DataAccessService;
    private vUsername: string;

    constructor() {
        RemittanceController._dataAccess = new DataAccessService();
        RemittanceController._errorHandling = new ErrorHandlingService();
        RemittanceController._httpService = new APIService.HTTPService();
    }

    async getRemittancesDetail(pRequest, pResponse) {
        console.log("Start getting remittances detail");
        try {
            
            let vParams = {
                dsp_id: 'DSP00001'
            };

            var vResult = await RemittanceController._dataAccess.executeSP('get_remittances_detail', vParams, false);
            console.log("Query Done with result : " + JSON.stringify(vResult));
            pResponse.json(vResult);
        }
        catch (pErr) {
            console.log("Failed to Query getting remittances detail with error message :" + pErr);
            var vError = {
                "status": "Error",
                "errorType": "Internal Exception",
                "errorCode": "ERR_INTERNAL_SYSTEM",
                "result": pErr
            };
            pResponse.json(vError);
        }
        console.log("End getting remittances detail");
    }
}