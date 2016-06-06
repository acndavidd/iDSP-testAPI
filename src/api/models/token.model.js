"use strict";
const idsp_model_1 = require('./idsp.model');
class TokenObject extends idsp_model_1.IDSPModel {
    constructor() {
        super();
    }
    setOPISToken(pOPISToken) {
        this.OPISToken = pOPISToken;
    }
    getOPISToken() {
        return this.OPISToken;
    }
    setDSPId(pDSPId) {
        this.DSPId = pDSPId;
    }
    getDSPId() {
        return this.DSPId;
    }
    getExpired() {
        return this.expired;
    }
}
exports.TokenObject = TokenObject;
//# sourceMappingURL=token.model.js.map