"use strict";
const idsp_model_1 = require('../idsp.model');
class Account extends idsp_model_1.IDSPModel {
    constructor(pUsername, pPassword) {
        super();
        this.Username = pUsername;
        this.Password = pPassword;
    }
}
exports.Account = Account;
//# sourceMappingURL=account.model.js.map