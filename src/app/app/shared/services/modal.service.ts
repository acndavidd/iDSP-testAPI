import { Injectable } from 'angular2/core';

export module Modal {
    export var ModalType = {
        ERROR : 1,
        INFO : 2,
        CONFIRMATION : 3,
        CUSTOM: 4
    };

    export var ButtonType = {
        OK_CANCEL : 1,
        YES_NO : 2,
        CUSTOM : 3
    };

    export class ModalButton {
        id: string;
        color_style: string;
        display: string;
        callback: Function;
        callbackParams: any;

        constructor(pId: string, pColorStyle: string, pDisplayText: string, pCallBack: Function, pCallBackParams: any) {
            this.id = pId;
            this.color_style = pColorStyle;
            this.display = pDisplayText;
            this.callback = pCallBack;
            this.callbackParams = pCallBackParams;
        }
    };

    @Injectable()
    export class ModalService {
        
        private vModalMessage: string;
        private vCurrentPage: string;
        private vModalType: number;
        private vShowModal: boolean;
        private vButtons;
        private vFootNote;
        private vDefaultOKButton: ModalButton;
        private vDefaultCANCELButton: ModalButton;
        private vConfirmationCallBack: Function;

        constructor() {
            this.vShowModal = false;
            this.vButtons = [];
            this.vFootNote = '';
        }

        getModalType() {
            return this.vModalType;
        }

        setModalType(pModalType: number) {
            let vCloseModalFunction = this.closeModal.bind(this);
            this.vDefaultOKButton = new ModalButton('ok-button', 'green', 'OK', vCloseModalFunction, null);
            this.vDefaultCANCELButton  = new ModalButton('cancel-button', 'green', 'CANCEL', vCloseModalFunction, null);
            this.vModalType = pModalType;
            this.vButtons = [];
            if(this.vModalType === ModalType.INFO || this.vModalType === ModalType.ERROR) {
                this.vButtons.push(this.vDefaultOKButton);
            }else if(this.vModalType === ModalType.CONFIRMATION) {
                this.setButtonType(ButtonType.YES_NO); // default is Yes No button
            }else if(this.vModalType === ModalType.CUSTOM) {
                // this.setButtonType(ButtonType);
            }
        }

        setButtonType(pButtonType: number) {
            this.vButtons = [];
            this.vDefaultOKButton.callback = this.getConfirmationCallBack();
            if(pButtonType === ButtonType.OK_CANCEL) {
                this.vButtons.push(this.vDefaultOKButton);
                this.vButtons.push(this.vDefaultCANCELButton);
            }else if(pButtonType === ButtonType.YES_NO) {
                this.vDefaultOKButton.display = 'YES';
                this.vDefaultCANCELButton.display = 'NO';
                this.vButtons.push(this.vDefaultOKButton);
                this.vButtons.push(this.vDefaultCANCELButton);
            }else if(pButtonType === ButtonType.CUSTOM) {
            }
        }

        setConfirmationCallBack(pCallBack: Function) {
            this.vConfirmationCallBack = pCallBack;
        }

        getConfirmationCallBack() {
            return this.vConfirmationCallBack;
        }

        getModalState() {
            return this.vShowModal;
        }

        setModalState(pState: boolean) {
            this.vShowModal = pState;
        }

        showModal() {
            this.vShowModal = true;
        }

        closeModal() {
            this.vShowModal = false;
        }

        getModalMessage() {
            return this.vModalMessage;
        }

        setModalMessage(pModalMessage: string) {
            this.vModalMessage = pModalMessage;
        }

        getFootNote() {
            return this.vFootNote;
        }

        setFootNote(pFootNote: string) {
            this.vFootNote = pFootNote;
        }

        getButtons() {
            return this.vButtons;
        }

        showErrorModal(pModalMessage:string) {
            this.vModalMessage = pModalMessage;
            this.setModalType(ModalType.ERROR);
            this.showModal();
        }

        showConfirmationModal(pModalMessage: string, pConfirmCallBack: Function, pFootNote?: string, pButtonType?: number) {
            this.setFootNote('');
            this.setModalMessage('');
            this.vModalMessage = pModalMessage;
            this.setConfirmationCallBack(pConfirmCallBack);
            if(pFootNote)
                this.setFootNote(pFootNote);
            this.setModalType(ModalType.CONFIRMATION);
            if(pButtonType)
                this.setButtonType(pButtonType);
            this.showModal();
        }

        toggleModal(pModalMessage:string, pModalType?:number, pArgs?:any) {
            this.setFootNote('');
            this.setModalMessage('');
            this.vModalMessage = pModalMessage;
            if(pArgs) {
                if(pArgs.footNote) {
                    this.setFootNote(pArgs.footNote);
                }
                if(pArgs.callback) {
                    this.setConfirmationCallBack = pArgs.callback;
                }
            }
            this.setModalType(pModalType);
            this.showModal();
            /* 
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
            */
        }
    }

};