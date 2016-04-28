import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

@Injectable()
export class ModalService {

    currentPage: string;

    mainModalState = false;

    modalState = {
        info: false,
        verificationcode : false
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

    toggleVerificationCodeModal() 
    {
        if(this.mainModalState)
        {
            this.refreshModal();
        }else
        {
            this.modalState.verificationcode = !this.modalState.verificationcode;
        }
        this.mainModalState = !this.mainModalState;
    }

    refreshModal()
    {
        this.modalState.info = false;
        this.modalState.verificationcode = false;
    }

}