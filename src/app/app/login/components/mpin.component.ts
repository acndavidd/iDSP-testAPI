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
    private autofocus:boolean;
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService: AuthenticationService,
        private _modalService: Modal.ModalService,
        private _pageNavigationService: PageNavigationService
        ) {

        this._layoutService.setCurrentPage('Mpin');
        this.autofocus = false;
    }

    cancel(pEvent) {
        pEvent.preventDefault();

        // For By Pass Directly without API
        this._router.navigate(['Starter']);
    }

    submit(pEvent) {
        pEvent.preventDefault();
        // this._authenticationService.submitMPIN(this.vMPIN1 + this.vMPIN2 + this.vMPIN3 + this.vMPIN4 + this.vMPIN5);
        // For By Pass Directly without API
        // this._pageNavigationService.navigate('Home', null, null);
        this._authenticationService.submitMPIN(this.vMPIN1 + this.vMPIN2 + this.vMPIN3 + this.vMPIN4 + this.vMPIN5);
    }

    ResendMpinModalComponent() {
        console.log('masuk com ts');
        // this._modalService.toggleResendMpinModal();
    }

    onchange(pStr) {
        switch (pStr) {
            case 1:
                if (!this.vMPIN1) {
                    document.getElementById('mpin1').focus();
                } else {
                    document.getElementById('mpin2').focus();
                }
                    break;
            case 2:
                if (!this.vMPIN2) {
                    document.getElementById('mpin1').focus();
                } else {
                    document.getElementById('mpin3').focus();
                }
                break;
            case 3:
                if (!this.vMPIN3) {
                    document.getElementById('mpin2').focus();
                } else {
                    document.getElementById('mpin4').focus();
                }
                break;
            case 4:
                if (!this.vMPIN4) {
                    document.getElementById('mpin3').focus();
                } else {
                    document.getElementById('mpin5').focus();
                }
                break;
            case 5:
                if (!this.vMPIN5) {
                    document.getElementById('mpin4').focus();
                }
            default:
                // code...
                break;
        }
    }
}