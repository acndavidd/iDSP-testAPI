"use strict";
const idsp_model_1 = require('../idsp.model');
class DspPhysicalInventoryModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pType, pRecordStart, pRecordEnd, pBrand, pSubCategory) {
        super();
        this.username = pUsername;
        this.type = pType;
        this.recordStart = pRecordStart;
        this.recordEnd = pRecordEnd;
        this.brand = pBrand;
        this.subCategory = pSubCategory;
    }
}
exports.DspPhysicalInventoryModel = DspPhysicalInventoryModel;
//# sourceMappingURL=dsp-physical-inventory.model.js.map