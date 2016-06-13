"use strict";
const idsp_model_1 = require('../../idsp.model');
class CallInfoModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pRetailerId, pDay) {
        super();
        this.username = pUsername;
        this.retailerid = pRetailerId;
        this.day = pDay;
    }
}
exports.CallInfoModel = CallInfoModel;
//# sourceMappingURL=call-info.model.js.map