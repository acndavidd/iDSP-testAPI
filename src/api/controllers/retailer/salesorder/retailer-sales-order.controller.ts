'use strict';
import {APIService} from '../../../services/api.service';
import {ErrorHandlingService} from '../../../services/error-handling.service';
import {TokenService} from '../../../services/token.service';
import {DataAccessService} from '../../../services/data-access.service';

// import your model here
import {TokenObject} from '../../../models/token.model';
import {RetailerSalesOrderModel} from '../../../models/input/retailer/retailer-sales-order.model';

//import {ErrHandlerService} from '../services/err.handler.service';

export interface RetailerSalesOrderInterface {
	newSalesOrder(pRequest, pResponse):Promise<void>;
}


export class RetailerSalesOrderController implements RetailerSalesOrderInterface {
	private static _errorHandling: ErrorHandlingService;
	private static _httpService: APIService.HTTPService;
	private static _dataAccess: DataAccessService;
	private vUsername: string;

	constructor() {
		RetailerSalesOrderController._dataAccess = new DataAccessService();
		RetailerSalesOrderController._errorHandling = new ErrorHandlingService();
		RetailerSalesOrderController._httpService = new APIService.HTTPService();
	}

	async newSalesOrder(pRequest, pResponse) {
		try {
			console.log('In newSalesOrder controller');
			var vResult;

			// initialize variabel
			let vMinSource = pRequest.body.dsp_min;
			let vMinDestination = pRequest.body.retailer_min;
			let vNominalValue = pRequest.body.load_transfer_amount;
			let vSource = pRequest.body.source;
			let vRetailerId = pRequest.params.id;
			// let vOrderDate = new Date(.toLocaleDateString();
			// let vRemarks = pRequest.body.remarks;
			// let vTotalAmount = pRequest.body.total_amount;
			// let vPromoAmount = pRequest.body.promo_amount;
			// let vNetAmount = pRequest.body.net_amount;
			// let vPaymentAmount = pRequest.body.payment_amount;
			// let vBalance = pRequest.body.balance;
			// let vPaymentStatus = pRequest.body.payment_status;
			// let vOrderStatus = pRequest.body.order_status;
			// let vLoadAmount = pRequest.body

			// valiate request type
			try {
				let vPath:string = '/elpnet/services/idsp/loadtransfer';
				let vModel = new RetailerSalesOrderModel(vMinSource, vMinDestination, vNominalValue, vSource, vRetailerId);
				let vParamsELP = vModel.vParamELPLoadTransfer;
				vResult = await RetailerSalesOrderController._httpService.post(APIService.APIType.ELP, vPath, null, vParamsELP);
				pResponse.status(vResult.status).json(vResult.transactionRRN);
			} catch(pErr) {
				JSON.stringify(pErr);
				RetailerSalesOrderController._errorHandling.throwError(400,'Failed to perform salesorder to ELP',pErr);
			}
		}catch(rErr) {
			JSON.stringify(rErr);
			RetailerSalesOrderController._errorHandling.throwError(400,'Failed in sales order',rErr);
		}
	}
}