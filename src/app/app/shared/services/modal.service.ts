import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';
import { LayoutService } from './layout.service';

export module Modal {
    export var ModalType = {
        ERROR : 1,
        INFO : 2,
        CONFIRMATION : 3,
        CUSTOM: 4
    };

    export var ModalButton = {
        OK_CANCEL : 1,
        YES_NO : 2
    };

    @Injectable()
    export class ModalService {
        
        private vModalMessage: string;
        private vCurrentPage: string;
        private vModalType: number;
        private vShowModal: boolean;
        private vButtons;
        private vFootNote;

        constructor(_layoutServie: LayoutService) {
            this.vShowModal = false;
            this.vButtons = [];
            this.vFootNote = '';
        }

        getModalType() {
            return this.vModalType;
        }

        getModalState() {
            return this.vShowModal;
        }

        setModalState(pState:boolean) {
            this.vShowModal = pState;
        }

        getModalMessage() {
            return this.vModalMessage;
        }

        getFootNote() {
            return this.vFootNote;
        }

        getButtons() {
            return this.vButtons;
        }

        closeModal(pParam) {
            pParam.vShowModal = false;
        }

        showErrorModal(pModalMessage:string) {
            this.vModalMessage = pModalMessage;
            this.setModalState(true);
            this.vModalType = Modal.ModalType.ERROR;
            this.vButtons = [];
            this.vButtons.push({ id : 'ok-button', display: 'OK' , color_style : 'green' , callback : this.closeModal, param : this });
        }

        toggleModal(pModalMessage:string, pModalType?:number, pArgs?:any) {
            this.vModalMessage = pModalMessage;
            this.setModalState(true);
            this.vButtons = [];
            let vCurrentContext = this;
            this.vFootNote = '';
            if(pArgs) {
                if(pArgs.footNote)this.vFootNote = pArgs.footNote;
                if(pArgs.param) {
                    if(pArgs.param._modalService) {
                        pArgs.param._modalService = this;
                    }
                }
            }
            if(pModalType === null)
                this.vModalType = Modal.ModalType.INFO;// default
            else 
                this.vModalType = pModalType;
            if(pModalType === Modal.ModalType.INFO || pModalType === Modal.ModalType.ERROR) {
                this.vButtons.push({ id : 'ok-button', display: 'OK' , color_style : 'green' , callback : this.closeModal, param : this });
            }else if(pModalType === Modal.ModalType.CONFIRMATION) {
                if(pArgs.ModalButton === Modal.ModalButton.OK_CANCEL) {
                    this.vButtons.push({ id : 'ok-button', display: 'OK' , color_style : 'green' , callback : pArgs.callback, param : pArgs.param });
                    this.vButtons.push({ id : 'cancel-button', display: 'CANCEL' , color_style : 'red' , callback : this.closeModal, param : this });
                }else if(pArgs.ModalButton === Modal.ModalButton.YES_NO) {
                    this.vButtons.push({ id : 'ok-button', display: 'YES' , color_style : 'green' , callback : pArgs.callback, param : pArgs.param });
                    this.vButtons.push({ id : 'cancel-button', display: 'NO' , color_style : 'red' , callback : this.closeModal, param : this });
                }
            }else {
                for(var vButton in pArgs.Buttons) {
                    this.vButtons.push(pArgs.Buttons[vButton]);
                }
            }
        }
    }

};