"use strict";
const idsp_model_1 = require('./idsp.model');
class TokenObject extends idsp_model_1.IDSPModel {
    constructor(pDSPId, pOPISToken, pFactorAuth0, pFactorAuth1) {
        super();
        this.DSPId = pDSPId;
        this.OPISToken = pOPISToken;
        this.factorAuth0 = pFactorAuth0;
        this.factorAuth1 = pFactorAuth1;
    }
    setDSPId(pDSPId) {
        this.DSPId = pDSPId;
    }
    getDSPId() {
        return this.DSPId;
    }
    setOPISToken(pOPISToken) {
        this.OPISToken = pOPISToken;
    }
    getOPISToken() {
        return this.OPISToken;
    }
    setFactorAuth0(state) {
        this.factorAuth0 = state;
    }
    getFactorAuth0() {
        return this.factorAuth0;
    }
    setFactorAuth1(state) {
        this.factorAuth1 = state;
    }
    getFactorAuth1() {
        return this.factorAuth1;
    }
}
exports.TokenObject = TokenObject;
//# sourceMappingURL=token.model.js.map