"use strict";
const idsp_model_1 = require('../../idsp.model');
class PhysicalInventoryModel extends idsp_model_1.IDSPModel {
    constructor(psalesPerson, pRetailerId) {
        super();
        this.salesperson = psalesPerson;
        this.retailerid = pRetailerId;
    }
}
exports.PhysicalInventoryModel = PhysicalInventoryModel;
//# sourceMappingURL=physical-inventory.model.js.map