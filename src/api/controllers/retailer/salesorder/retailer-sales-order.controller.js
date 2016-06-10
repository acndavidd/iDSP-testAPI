'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const api_service_1 = require('../../../services/api.service');
const error_handling_service_1 = require('../../../services/error-handling.service');
const data_access_service_1 = require('../../../services/data-access.service');
const retailer_sales_order_model_1 = require('../../../models/input/retailer/retailer-sales-order.model');
class RetailerSalesOrderController {
    constructor() {
        RetailerSalesOrderController._dataAccess = new data_access_service_1.DataAccessService();
        RetailerSalesOrderController._errorHandling = new error_handling_service_1.ErrorHandlingService();
        RetailerSalesOrderController._httpService = new api_service_1.APIService.HTTPService();
    }
    newSalesOrder(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    let vPath = '/elpnet/services/idsp/loadtransfer';
                    let vModel = new retailer_sales_order_model_1.RetailerSalesOrderModel(vMinSource, vMinDestination, vNominalValue, vSource, vRetailerId);
                    let vParamsELP = vModel.vParamELPLoadTransfer;
                    vResult = yield RetailerSalesOrderController._httpService.post(api_service_1.APIService.APIType.ELP, vPath, null, vParamsELP);
                    pResponse.status(vResult.status).json(vResult.transactionRRN);
                }
                catch (pErr) {
                    JSON.stringify(pErr);
                    RetailerSalesOrderController._errorHandling.throwError(400, 'Failed to perform salesorder to ELP', pErr);
                }
            }
            catch (rErr) {
                JSON.stringify(rErr);
                RetailerSalesOrderController._errorHandling.throwError(400, 'Failed in sales order', rErr);
            }
        });
    }
}
exports.RetailerSalesOrderController = RetailerSalesOrderController;
//# sourceMappingURL=retailer-sales-order.controller.js.map