import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

@Injectable()
export class ModalService {

    vCurrentPage: string;

    vMainModalState = false;

    vModalState = {
        info: false,
        verificationCode : false,
        resendMpin : false,
        collection: false,
        skipSalesOrder: false
    };

    constructor() {}

    getMainModalState() {
        return this.vMainModalState;
    }

    getModalState() {
        return this.vModalState;
    }

    toggleVerificationCodeModal() {
        if (this.vMainModalState) {
            this.refreshModal();
        } else {
            this.vModalState.verificationCode = !this.vModalState.verificationCode;
        }
        this.vMainModalState = !this.vMainModalState;
    }

    toggleResendMpinModal() {
        if (this.vMainModalState) {
            this.refreshModal();
        }else {
            this.vModalState.resendMpin = !this.vModalState.resendMpin;
        }
        this.vMainModalState = !this.vMainModalState;
    }
    toggleSkipSalesOrderModal() {
        if (this.vMainModalState) {
            this.refreshModal();
        }else {
            this.vModalState.skipSalesOrder = !this.vModalState.skipSalesOrder;
        }
        this.vMainModalState = !this.vMainModalState;
    }
    toggleCollectionModal() {
        if (this.vMainModalState) {
            this.refreshModal();
        } else {
            this.vModalState.collection = !this.vModalState.collection;
        }
        this.vMainModalState = !this.vMainModalState;
    }

    refreshModal() {
        this.vModalState.info = false;
        this.vModalState.collection = false;
        this.vModalState.verificationCode = false;
        this.vModalState.resendMpin = false;
    }

}