import {IDSPModel} from '../idsp.model';
import {isValid, IsLength} from 'class-validator';

export class RemittanceOutputModel extends IDSPModel {
    remit_id: string;
    trans_date: string;
    remit_amount: number;
    remit_type: number;
    bank_name: string;
    branch_name: string;
    transfer_date: string;
    account_no: string;
    rrn: string;

    constructor(
        pRemitID: string,
        pTransDate: string,
        pRemitAmount: number,
        pRemitType: number,
        pBankName: string,
        pBranchName: string,
        pTransferDate: string,
        pAccountNo: string,
        pRRN: string) {
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