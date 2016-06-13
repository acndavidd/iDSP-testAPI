"use strict";
const idsp_model_1 = require('../../idsp.model');
class SelfTransactionRetailerModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pRetailerId, pRecordStart, pRecordEnd) {
        super();
        this.username = pUsername;
        this.retailerid = pRetailerId;
        this.recordstart = pRecordStart;
        this.recordend = pRecordEnd;
    }
}
exports.SelfTransactionRetailerModel = SelfTransactionRetailerModel;
//# sourceMappingURL=selftransaction-per-retailer.model.js.map