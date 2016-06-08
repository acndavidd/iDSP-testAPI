'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';
import {EncryptionService} from '../../shared/services/encryption.service';
import {PasscodeService, PASSCODESTEP} from '../../shared/services/passcode.service';

@Component({
    selector: 'passcode',
    templateUrl: './app/login/components/passcode-lock.component.html',
    directives: [
        NgModel
    ],
})



export class PasscodeLockComponent {

    private vPasscodeLock:string;
    private vConfirm:string;
    private vInputtedNumber:string;
    private vLength:number = 0;    
    private vPassIcon:string='';
    private vErrorCode:number = 0;
    
    private vState;

    constructor (
        private _passcodeService: PasscodeService
        ) {
        this.vPasscodeLock = '';
        this.vConfirm = '';
    }

    getState() {
        return this.vState;
    }
    
    getPassCodeState() {
        return this._passcodeService.getPasscodeState();
    }

    getPasscodeTitle() {
        return this._passcodeService.getPasscodeTitle();
    }

    getDisplayMessage() {
        return this._passcodeService.getDisplayMessage();
    }

    getStep() {
        return this._passcodeService.getStep();
    }

    setStep(pStep: number) {
        this._passcodeService.setStep(pStep);
    }

    cancel(pEvent) {
        pEvent.preventDefault();
        // 
    }

    // receive inputted number if user click button 0/1/2/3/4/5/6/7/8/9
    onClickKeypad(pKey) {
        this.vPasscodeLock += pKey.toString();
        this.vLength = this.vPasscodeLock.length;
        // this.passcodeLogic(this.vInputtedNumber);
        if(this.vLength === 4) {
            switch(this.getState()) {
                case PASSCODESTEP.SET :
                    this.vConfirm = this.vPasscodeLock;
                    this.setStep(PASSCODESTEP.CONFIRM);
                    break;
                case PASSCODESTEP.CONFIRM :
                    if(this.vConfirm === this.vPasscodeLock) { 
                        // if confirmation is the same
                        // decrypt the refresh token with passcode
                    }
                    break;
                case PASSCODESTEP.INPUT :
                    // decrypt the refresh token
                    break;
            }
        }
    }

    // passcode logic
    // passcodeLogic(pInputtedNumber) {
    //     // concate inputted number into one string
    //     this.vPasscodeLock = this.vPasscodeLock+pInputtedNumber;
    //     this.vLength = this.vPasscodeLock.length;
    //     // if length more = 4 and passcode correct, goes to home menu
    //     if((this.vLength === 4 ) && (this.vPasscodeLock === '1234')) {
    //         this.vPasscodeLock = '';
    //         this._pageNavigationService.navigate('Home', null, null);
    //     }
    //     // if length =4 ,and passcode wrong
    //     else if((this.vLength === 4) && (this.vPasscodeLock !== '1234')) {
    //         this.vPasscodeLock  = '';
    //         this.vErrorCode = 1;
    //         console.log('Password Correct');
    //         this.vLength = 0;
    //     }
    // }

    // logic if user press button delete
    onClickDelete() {
        this.vPasscodeLock = this.vPasscodeLock.substring(0,this.vPasscodeLock.length - 1);
        this.vLength = this.vPasscodeLock.length;
        console.log('After Deleted: ', this.vPasscodeLock, ', Length: ',this.vLength);
    }

}