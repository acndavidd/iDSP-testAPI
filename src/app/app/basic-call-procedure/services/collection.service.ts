import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Injectable()

export class CollectionService {

    private vErrorMsg: string;
    private vIsLoading: boolean;
    private vCollectionHistory: any;
    private vTransList = {
        'totalRecord': 0,
        'totalAmount': 0,
        'selfTransactionList': [{
            'retailerMIN': '',
            'transactionId': '',
            'transactionDate': '',
            'amount': 0
        }],
        'BCPTransactionList': [{
            'order_id': '',
            'trans_date': '',
            'amount': 0,
        }]
    };

    private vNewTransList = {
        'totalRecord': 0,
        'totalAmount': 0,
        'TransactionList': []
    };

    private vPaymentAmount: number;
    private vPaymentTotal: number;
    private vPaymentRemarks: string;

    constructor(
        private _http: Http,
        private _router: Router
    ) {
        this.vIsLoading = false;
    }

    /* Method */
    insertSelfIntoList(mapping, selfTransactionList, iSelf) {
        // push self first
        mapping.order_id = selfTransactionList[iSelf].transactionId;
        mapping.trans_date = selfTransactionList[iSelf].transactionDate;
        mapping.amount = selfTransactionList[iSelf].amount;
        mapping.trans_type = 'SELF';
        if (this.vPaymentAmount >= selfTransactionList[iSelf].amount) {
            this.vPaymentAmount = this.vPaymentAmount - selfTransactionList[iSelf].amount;
            mapping.payment_type = 'full';
            mapping.payment_amount = selfTransactionList[iSelf].amount;
        } else {
            mapping.payment_type = 'partial';
            mapping.payment_amount = this.vPaymentAmount;
            this.vPaymentAmount = this.vPaymentAmount - mapping.payment_amount;
        }
        mapping.self_mop = 'CASH';
        mapping.self_details = this.vPaymentRemarks;
        this.vNewTransList.TransactionList.push(mapping);
    }

    insertBCPIntoList(mapping, BCPTransactionList, iBCP) {
        // push bcp first
        mapping.order_id = BCPTransactionList[iBCP].order_id;
        mapping.trans_date = BCPTransactionList[iBCP].trans_date;
        mapping.amount = BCPTransactionList[iBCP].amount;
        mapping.trans_type = 'BCP';
        if (this.vPaymentAmount >= BCPTransactionList[iBCP].amount) {
            this.vPaymentAmount = this.vPaymentAmount - BCPTransactionList[iBCP].amount;
            mapping.payment_type = 'full';
            mapping.payment_amount = BCPTransactionList[iBCP].amount;
        } else {
            mapping.payment_type = 'partial';
            mapping.payment_amount = this.vPaymentAmount;
            this.vPaymentAmount = this.vPaymentAmount - mapping.payment_amount;
        }
        mapping.self_mop = '';
        mapping.self_details = this.vPaymentRemarks;
        iBCP++;
        this.vNewTransList.TransactionList.push(mapping);
    }

    /* Getter */
    getError(): string {
        return this.vErrorMsg;
    }

    getLoadingState(): boolean {
        return this.vIsLoading;
    }

    getCollectionHistory() {
        return this.vCollectionHistory;
    }

    getTransList() {
        return this.vTransList;
    }

    getNewTransList() {
        return this.vNewTransList;
    }

    getPaymentAmount() {
        return this.vPaymentAmount;
    }

    getPaymentTotal() {
        return this.vPaymentTotal;
    }

    getPaymentRemarks() {
        return this.vPaymentRemarks;
    }

    /* Setter*/
    setCollectionHistory(pCollectionHistory: any) {
        this.vCollectionHistory = pCollectionHistory;
    }

    setTransList() {
        var dataTransList = {
            'totalRecord': 3,
            'totalAmount': 2800,
            'selfTransactionList': [{
                'retailerMIN': '9993464365',
                'transactionId': '850006000514',
                'transactionDate': '2016-01-12 06:17',
                'amount': 800
            }],
            'BCPTransactionList': [
                {
                    'order_id': '112233',
                    'trans_date': '2016-01-11 20:17',
                    'amount': 900
                },
                {
                    'order_id': '445566',
                    'trans_date': '2016-01-16 10:17',
                    'amount': 1100
                }
            ]
        };
        this.vTransList = dataTransList;
    }

    setNewTransList() {
        var selfTransactionList = this.vTransList.selfTransactionList;
        var BCPTransactionList = this.vTransList.BCPTransactionList;
        var iSelf = 0;
        var iBCP = 0;
        var tempDateSelf, tempDateBCP;
        var mapping;
        // populate new json
        this.vNewTransList.totalRecord = this.vTransList.totalRecord;
        this.vNewTransList.totalAmount = this.vTransList.totalAmount;
        this.vNewTransList.TransactionList = [];
        for (let i = 0; i < this.vTransList.totalRecord; i++) {
            mapping = {
                'order_id': '',
                'trans_date': '',
                'amount': 0,
                'trans_type': '',
                'payment_type': '',
                'payment_amount': 0,
                'self_mop': '',
                'self_details': ''
            };
            // only have self
            console.log('index ' + i);
            if (selfTransactionList[iSelf] !== undefined && BCPTransactionList[iBCP] === undefined) {
                this.insertSelfIntoList(mapping, selfTransactionList, iSelf);
                iSelf++;
            }
            // only have bcp
            else if (selfTransactionList[iSelf] === undefined && BCPTransactionList[iBCP] !== undefined) {
                this.insertBCPIntoList(mapping, BCPTransactionList, iBCP);
                iBCP++;
            }
            // have self and bcp
            else if (selfTransactionList[iSelf] !== undefined && BCPTransactionList[iBCP] !== undefined) {
                tempDateSelf = new Date((selfTransactionList[iSelf].transactionDate));
                tempDateBCP = new Date((BCPTransactionList[iBCP].trans_date));
                if (tempDateSelf < tempDateBCP) {
                    // push self first
                    this.insertSelfIntoList(mapping, selfTransactionList, iSelf);
                    iSelf++;
                } else {
                    // push bcp first
                    this.insertBCPIntoList(mapping, BCPTransactionList, iBCP);
                    iBCP++;
                }
            }
        }
        console.log(JSON.stringify(this.vNewTransList));
    }

    setPaymentAmount(pPaymentAmount) {
        this.vPaymentAmount = pPaymentAmount;
    }
    setPaymentTotal(pPaymentTotal) {
        this.vPaymentTotal = pPaymentTotal;
    }
    setPaymentRemarks(pPaymentRemarks) {
        this.vPaymentRemarks = pPaymentRemarks;
    }
    setPaymentToFull(index: number) {
        this.vNewTransList.TransactionList[index].payment_type = 'full';
        this.vNewTransList.TransactionList[index].payment_amount = 0 + this.vNewTransList.TransactionList[index].amount;
    }

}