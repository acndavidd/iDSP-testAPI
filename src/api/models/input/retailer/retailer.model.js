"use strict";
const idsp_model_1 = require('../../idsp.model');
class RetailerInputModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pRetailerID, pRecordStart, pRecordEnd) {
        super();
        this.username = pUsername;
        this.retailerid = pRetailerID;
        this.recordstart = pRecordStart;
        this.recordend = pRecordEnd;
    }
}
exports.RetailerInputModel = RetailerInputModel;
//# sourceMappingURL=retailer.model.js.map