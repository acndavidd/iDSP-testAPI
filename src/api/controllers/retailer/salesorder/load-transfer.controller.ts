'use strict';
import {APIService} from '../../../services/api.service';
import {ErrorHandlingService} from '../../../services/error-handling.service';
import {TokenService} from '../../../services/token.service';
import {DataAccessService} from '../../../services/data-access.service';

// import your model here
import {TokenObject} from '../../../models/token.model';
import {BalanceModel} from '../../../models/input/retailer/balance.model';
import {DropsizeModel} from '../../../models/input/retailer/dropsize.model';

//import {ErrHandlerService} from '../services/err.handler.service';

export interface LoadTransferInterface {
	getSuggestedOrder(pRequest, pResponse):Promise<void>;
	getCurrentBalance(pRequest, pResponse):Promise<void>;
}


export class LoadTransferController implements LoadTransferInterface {
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

	constructor() {
		LoadTransferController._dataAccess = new DataAccessService();
		LoadTransferController._errorHandling = new ErrorHandlingService();
		LoadTransferController._httpService = new APIService.HTTPService();
	}

	async getSuggestedOrder(pRequest, pResponse) {
		try {
			console.log('In getSuggestedOrder controller');
			var vMonth = new Date().getMonth();
			if (pRequest.query.subcat_type === 'L') {
				let vData = new DropsizeModel(pRequest.query.brand, vMonth, pRequest.params.id, pRequest.query.subcat_type);

				var vSuggestedOrder:any = await LoadTransferController._dataAccess.getDropSize('get_bcp_dropsize', vData.paramLoad);
				console.log('Result : ' + vSuggestedOrder);
				pResponse.status(200).json(vSuggestedOrder);
			} else {
				console.log('P');
			}
		}catch(pErr) {
			JSON.stringify(pErr);
			LoadTransferController._errorHandling.throwError(400,'Failed to get suggested order',pErr);
		}
	}

	async getCurrentBalance(pRequest, pResponse) {
		try {
			console.log('in getCurrentBalance controller');	
			let vPath:string = '/elpnet/services/idsp/retailerbalance';
			let vParams = new BalanceModel(pRequest.body.min, pRequest.body.source);
			let vResult = await LoadTransferController._httpService.post(APIService.APIType.ELP, vPath, null, vParams);
			pResponse.status(200).json(vResult);
		}catch(pErr) {
			LoadTransferController._errorHandling.throwError(400,'Failed to get balance from ELP',pErr);
		}
	}
}