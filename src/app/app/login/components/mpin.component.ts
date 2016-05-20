'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'mpin',
    templateUrl: './app/login/components/mpin.component.html',
    directives: [
        NgModel
    ],
})

export class MpinComponent {
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService: AuthenticationService,
        private _modalService: ModalService,
        private _pageNavigationService: PageNavigationService
        ) {

        this._layoutService.setCurrentPage('Mpin');
    }

    cancel(pEvent) {
        pEvent.preventDefault();

        // For By Pass Directly without API
        this._router.navigate(['Starter']);
    }

    submit(pEvent) {
        pEvent.preventDefault();

        // For By Pass Directly without API
        this._pageNavigationService.navigate('Home', null, null);
    }

    ResendMpinModalComponent() {
        console.log('masuk com ts');
        this._modalService.toggleResendMpinModal();
    }

}