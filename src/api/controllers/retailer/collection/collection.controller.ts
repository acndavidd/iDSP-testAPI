'use strict';
// initial
import {DataAccessService} from '../../../services/data-access.service';
import {APIService} from '../../../services/api.service';
import {ErrorHandlingService} from '../../../services/error-handling.service';

// import your model here
import {PhysicalInventoryModel} from '../../../models/input/inventory/physical-inventory.model';

export interface CollectionInterface {
    getCollection(pRequest, pResponse): Promise<void>;
}

export class CollectionController implements CollectionInterface {

    private vUsername: string;
    private static _errorHandling: ErrorHandlingService;
    private static _dataAccessService: DataAccessService;
    private static _httpService: APIService.HTTPService;

    constructor() {
        CollectionController._dataAccessService = new DataAccessService();
        CollectionController._httpService = new APIService.HTTPService();
        CollectionController._errorHandling = new ErrorHandlingService();
    }

    async getCollection(pRequest, pResponse) {
        console.log("Start getting collection.");

        var vSalesPerson = 'DSP00001';
        var vRetailerId = pRequest.params.retailid;

        try {
            let vParam = new PhysicalInventoryModel(vSalesPerson, vRetailerId);
            if (vParam.validate()) {
                let vResult = await CollectionController._dataAccessService.getCollection('get_collection', vParam);
                pResponse.json(vResult);
            } else {
                CollectionController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 100, 'INPUT_ERRORS', vParam.Errors);
            }
        }
        catch (pErr) {
            if (pErr.errorCode === 111) {
                CollectionController._errorHandling.throwHTTPErrorResponse(pResponse, 400, 111, 'INVALID_CREDENTIALS');
            }
            else if (pErr.errorCode === 112) {
                // specify error message here 
            }
        }
        console.log("end getting collection.");
    }
}