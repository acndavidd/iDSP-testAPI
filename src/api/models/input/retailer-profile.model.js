"use strict";
const idsp_model_1 = require('../idsp.model');
class RetailerProfileModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pRetailerId) {
        super();
        this.username = pUsername;
        this.retailerid = pRetailerId;
    }
}
exports.RetailerProfileModel = RetailerProfileModel;
//# sourceMappingURL=retailer-profile.model.js.map