import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

export module Modal {
    export var ModalType = {
        ERROR : 1,
        OK : 2,
        OK_CANCEL : 3
    };
    @Injectable()
    export class ModalService {
        
        vModalMessage: string;
        vCurrentPage: string;
        vModalType: number;
        vMainModalState = false;
        vShowModal = false;
        vOKCallBack;
        vCANCELCallBack;
        
        vModalState = {
            error: false,
            info: false,
            verificationCode : false,
            resendMpin : false,
            collection: false,
            skipSalesOrder: false
        };

        constructor() {}

        getModalType() {
            return this.vModalType;
        }

        getMainModalState() {
            return this.vMainModalState;
        }

        getModalState() {
            return this.vShowModal;
            // return this.vModalState;
        }

        setModalMessage(pMessage: string) {
            this.vModalMessage = pMessage;
        }

        getModalMessage() {
            return this.vModalMessage;
        }

        getOKCallBack() {
            return this.vOKCallBack;
        }

        getCANCELCallBack() {
            return this.vCANCELCallBack;
        }

        toggleModal(pModalMessage:string, pModalType?:number, pOKCallBack?:any, pCANCELCallBack?:any) {
            this.vModalMessage = pModalMessage;
            this.vShowModal = !this.vShowModal;
            if(pModalType === null)
                this.vModalType = Modal.ModalType.OK;// default
            else 
                this.vModalType = pModalType;
            if(pOKCallBack)this.vOKCallBack = pOKCallBack;
            if(pCANCELCallBack)this.vCANCELCallBack = pCANCELCallBack;
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

        toggleErrorModal() {
            if (this.vMainModalState) {
                this.refreshModal();
            } else {
                this.vModalState.error = !this.vModalState.error;
            }
            this.vMainModalState = !this.vMainModalState;
        }

        refreshModal() {
            this.vModalState.info = false;
            this.vModalState.collection = false;
            this.vModalState.verificationCode = false;
            this.vModalState.resendMpin = false;
            this.vModalState.skipSalesOrder = false;
        }
    }

};