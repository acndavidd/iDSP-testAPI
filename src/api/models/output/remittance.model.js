"use strict";
const idsp_model_1 = require('../idsp.model');
class RemittanceOutputModel extends idsp_model_1.IDSPModel {
    constructor(pRemitID, pTransDate, pRemitAmount, pRemitType, pBankName, pBranchName, pTransferDate, pAccountNo, pRRN) {
        super();
        this.remit_id = pRemitID;
        this.trans_date = pTransDate;
        this.remit_amount = pRemitAmount;
        this.remit_type = pRemitType;
        this.bank_name = pBankName;
        this.branch_name = pBranchName;
        this.trans_date = pTransferDate;
        this.account_no = pAccountNo;
        this.rrn = pRRN;
    }
}
exports.RemittanceOutputModel = RemittanceOutputModel;
//# sourceMappingURL=remittance.model.js.map