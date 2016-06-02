"use strict";
const idsp_model_1 = require('../idsp.model');
class RetailerOutputModel extends idsp_model_1.IDSPModel {
    constructor(pRetailerID, pStoreName, pOutletType, pRetailerMinDetails, pRetailerAddress, pNumberofSELFTransaction, pNumberofAgingSELFTransaction, pTotalAmountofSELFTransaction, pDspId, pDspName) {
        super();
        this.retailerId = pRetailerID;
        this.storeName = pStoreName;
        this.outletType = pOutletType;
        this.retailerMinDetails = pRetailerMinDetails;
        this.retailerAddress = pRetailerAddress;
        this.numberofSELFTransaction = pNumberofSELFTransaction;
        this.numberofAginfSELFTransaction = pNumberofAgingSELFTransaction;
        this.totalAmountSELFTransaction = pTotalAmountofSELFTransaction;
        this.DspId = pDspId;
        this.DspName = pDspName;
        this.param_to_db = {
            retailerid: this.retailerId,
            store_name: this.storeName,
            outlet_type: this.outletType,
            retailer_min: this.retailerMinDetails,
            retailer_address: this.retailerAddress,
            number_of_self_transaction: this.numberofSELFTransaction,
            number_of_aging_self_transaction: this.numberofAginfSELFTransaction,
            total_amount_self_transaction: this.totalAmountSELFTransaction,
            dsp_id: this.DspId,
            dsp_name: this.DspName
        };
    }
}
exports.RetailerOutputModel = RetailerOutputModel;
//# sourceMappingURL=retailer.model.js.map