"use strict";
const class_validator_1 = require('class-validator');
class IDSPModel {
    validate() {
        if (!class_validator_1.isValid(this)) {
            this.Errors = class_validator_1.validate(this);
        }
        return class_validator_1.isValid(this);
    }
}
exports.IDSPModel = IDSPModel;
//# sourceMappingURL=idsp.model.js.map