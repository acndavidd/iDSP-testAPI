"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const class_validator_1 = require('class-validator');
class LoginModel {
    constructor(pUsername, pPassword) {
        this.Username = pUsername;
        this.Password = pPassword;
    }
    validate() {
        if (!class_validator_1.isValid(this)) {
            this.Errors = class_validator_1.validate(this);
        }
        return class_validator_1.isValid(this);
    }
}
__decorate([
    class_validator_1.IsLength(8, 8, { message: 'Invalid DSP ID' })
], LoginModel.prototype, "Username", void 0);
exports.LoginModel = LoginModel;
//# sourceMappingURL=login.model.js.map