'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {Modal} from '../../shared/services/modal.service';

@Component({
    selector: 'mpin',
    templateUrl: './app/login/components/passcode-lock.component.html',
    directives: [
        NgModel
    ],
})

export class PasscodeLockComponent {

    private vPasscodeLock:string = '';
    private vInputtedNumber:string;
    private vLength:number = 0;    
    private vPassIcon:string='';
    private vErrorCode:number = 0;

    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService: AuthenticationService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService
        ) {

        this._layoutService.setCurrentPage('PasscodeLock');
    }

    cancel(pEvent) {
        pEvent.preventDefault();
        // For By Pass Directly without API
        this._router.navigate(['Mpin']);
    }

    // receive inputted number if user click button 0/1/2/3/4/5/6/7/8/9
    onClickKeypad(pKey) {
        this.vInputtedNumber = pKey.toString();
        console.log('Press: ', this.vInputtedNumber);
        this.passcodeLogic(this.vInputtedNumber);
    }

    // passcode logic
    passcodeLogic(pInputtedNumber) {
        // concate inputted number into one string
        this.vPasscodeLock = this.vPasscodeLock+pInputtedNumber;
        console.log('Concate:  ', this.vPasscodeLock);
        this.vLength = this.vPasscodeLock.length;
        console.log('Length: ',this.vLength);

        // if length more = 4 and passcode correct, goes to home menu
        if((this.vLength === 4 ) && (this.vPasscodeLock === '2222')) {
            this.vPasscodeLock = '';
            this._pageNavigationService.navigate('Home', null, null);
        }
        // if length =4 ,and passcode wrong
        else if((this.vLength === 4) && (this.vPasscodeLock !== '2222')) {
            this.vPasscodeLock  = '';
            this.vErrorCode = 1;
            console.log('Password Correct');
            this.vLength = 0;
        }
    }

    // logic if user press button delete
    onClickDelete() {
        this.vPasscodeLock = this.vPasscodeLock.substring(0,this.vPasscodeLock.length - 1);
        this.vLength = this.vPasscodeLock.length;
        console.log('After Deleted: ', this.vPasscodeLock, ', Length: ',this.vLength);
    }

}