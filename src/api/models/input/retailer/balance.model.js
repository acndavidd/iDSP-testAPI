"use strict";
const idsp_model_1 = require('../../idsp.model');
class BalanceModel extends idsp_model_1.IDSPModel {
    constructor(pMin, pSource) {
        super();
        this.min = pMin;
        this.source = pSource;
    }
}
exports.BalanceModel = BalanceModel;
//# sourceMappingURL=balance.model.js.map