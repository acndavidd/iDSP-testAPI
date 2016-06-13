"use strict";
const idsp_model_1 = require('../../idsp.model');
class DropsizeModel extends idsp_model_1.IDSPModel {
    constructor(pBrand, pMonth, pRetailerId, pSubcatType) {
        super();
        this.brand = pBrand;
        this.month = pMonth;
        this.retailer_id = pRetailerId;
        this.subcat_type = pSubcatType;
        this.paramLoad = {
            brand: this.brand,
            month: this.month,
            retailer_id: this.retailer_id,
            subcat_type: this.subcat_type
        };
    }
}
exports.DropsizeModel = DropsizeModel;
//# sourceMappingURL=dropsize.model.js.map