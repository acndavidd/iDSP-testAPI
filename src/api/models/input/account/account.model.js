"use strict";
const idsp_model_1 = require('../../idsp.model');
var Account;
(function (Account_1) {
    class Account extends idsp_model_1.IDSPModel {
        constructor(pUsername, pPassword) {
            super();
            this.Username = pUsername;
            this.Password = pPassword;
        }
    }
    Account_1.Account = Account;
    class MPIN extends idsp_model_1.IDSPModel {
        constructor(pUsername, pMPIN) {
            super();
            this.Username = pUsername;
            this.MPIN = pMPIN;
        }
    }
    Account_1.MPIN = MPIN;
})(Account = exports.Account || (exports.Account = {}));
//# sourceMappingURL=account.model.js.map