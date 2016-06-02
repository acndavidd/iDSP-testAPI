"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const idsp_model_1 = require('../idsp.model');
const class_validator_1 = require('class-validator');
class MPINModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pMPIN) {
        super();
        this.Username = pUsername;
        this.MPIN = pMPIN;
    }
}
__decorate([
    class_validator_1.IsLength(5, 5, { message: 'Invalid MPIN Format' })
], MPINModel.prototype, "MPIN", void 0);
exports.MPINModel = MPINModel;
//# sourceMappingURL=mpin.model.js.map