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
    templateUrl: './app/login/components/mpin.component.html',
    directives: [
        NgModel
    ],
})

export class MpinComponent {
    private vMPIN1:string;
    private vMPIN2:string;
    private vMPIN3:string;
    private vMPIN4:string;
    private vMPIN5:string;
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService: AuthenticationService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService
        ) {

        this._layoutService.setCurrentPage('Mpin');
        // this.autofocus = false;
        setTimeout( () => {this.cancel, this.submit, this.onchange, this.vMPIN1, this.vMPIN2, this.vMPIN3, this.vMPIN4, this.vMPIN5;}, 1);
    }

    cancel(pEvent) {
        pEvent.preventDefault();

        // For By Pass Directly without API
        this._router.navigate(['Starter']);
    }

    submit(pEvent) {
        pEvent.preventDefault();
        this._authenticationService.submitMPIN(this.vMPIN1 + this.vMPIN2 + this.vMPIN3 + this.vMPIN4 + this.vMPIN5);
        // For By Pass Directly without API
        // this._pageNavigationService.navigate('Home', null, null);
        // this._authenticationService.submitMPIN();

        this._pageNavigationService.navigate('Home', null, null);
        // this._authenticationService.submitMPIN(this.vMPIN1 + this.vMPIN2 + this.vMPIN3 + this.vMPIN4 + this.vMPIN5);
    }

    ResendMpinModalComponent() {
        console.log('masuk com ts');
        // this._modalService.toggleResendMpinModal();
    }

    onchange(pKeyCode, pId: number) {
        var vId = 1;
        var vMpin = 'mpin';
        if (pKeyCode === 32) {
            document.getElementById(vMpin+pId).focus();
        } else if (pKeyCode === 8) {
            if (pId === 1) {
                pId = 2;
            }
            document.getElementById(vMpin+(pId-1)).focus();
        } else if (pKeyCode === 13) {
            this.submit(event);
        } else {
            if (pId === 5) {
                pId = 4;
            }
            document.getElementById(vMpin+(pId+1)).focus();
        }
    }
}