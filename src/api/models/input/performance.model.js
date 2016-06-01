"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const idsp_model_1 = require('../idsp.model');
const class_validator_1 = require('class-validator');
class PerformanceModel extends idsp_model_1.IDSPModel {
    constructor(psalesPerson, pActualType, pBrand) {
        super();
        this.salesPerson = psalesPerson;
        this.actualType = pActualType;
        this.brand = pBrand;
    }
}
__decorate([
    class_validator_1.IsLength(8, 8, { message: 'Invalid DSP ID' })
], PerformanceModel.prototype, "salesPerson", void 0);
exports.PerformanceModel = PerformanceModel;
//# sourceMappingURL=performance.model.js.map