import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

@Injectable()
export class ModalService {

    currentPage: string;

    mainModalState = false;

    modalState = {
        info: false,
        verificationCode : false
    }

    constructor() {}

    getMainModalState()
    {
        return this.mainModalState;
    }

    getModalState() 
    {
        return this.modalState;
    }
    
    toggleVerificationCodesModal() 
    {
        if(this.mainModalState)
        {
            this.refreshModal();
        }else
        {
            this.modalState.verificationCode = !this.modalState.verificationCode;
        }
        this.mainModalState = !this.mainModalState;
    }

    refreshModal()
    {
        this.modalState.info = false;
        this.modalState.verificationCode = false;
    }

}