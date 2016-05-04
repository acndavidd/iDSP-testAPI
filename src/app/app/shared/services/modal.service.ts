import { Injectable } from 'angular2/core';
import { Layout } from '../../../models/layout';

@Injectable()
export class ModalService {

    vCurrentPage: string;

    vMainModalState = false;

    vModalState = {
        info: false,
        verificationCode : false,
        collection: false
    }

    constructor() {}

    getMainModalState()
    {
        return this.vMainModalState;
    }

    getModalState() 
    {
        return this.vModalState;
    }
    
    toggleVerificationCodeModal() 
    {
        if(this.vMainModalState)
        {
            this.refreshModal();
        }else
        {
            this.vModalState.verificationCode = !this.vModalState.verificationCode;
        }
        this.vMainModalState = !this.vMainModalState;
    }
    
    toggleCollectionModal() 
    {
        if(this.vMainModalState)
        {
            this.refreshModal();
        }else
        {
            this.vModalState.collection = !this.vModalState.collection;
        }
        this.vMainModalState = !this.vMainModalState;
    }                



    refreshModal()
    {
        this.vModalState.info = false;
        this.vModalState.collection = false;
        this.vModalState.verificationCode = false;
    }

}