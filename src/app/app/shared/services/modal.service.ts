import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

@Injectable()
export class ModalService {

    currentPage: string;

    mainModalState = false;

    modalState = {
        info: false,
        verificationcode : false,
        collection: false
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
            this.modalState.verificationcode = !this.modalState.verificationcode;
        }
        this.mainModalState = !this.mainModalState;
    }
    
    toggleCollectionModal() 
    {
        if(this.mainModalState)
        {
            this.refreshModal();
        }else
        {
            this.modalState.collection = !this.modalState.collection;
        }
        this.mainModalState = !this.mainModalState;
    }                



    refreshModal()
    {
        this.modalState.info = false;
        this.modalState.collection = false;
        this.modalState.verificationcode = false;
    }

}