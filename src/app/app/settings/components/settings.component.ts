import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {Modal} from '../../shared/services/modal.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'settings',
    templateUrl: './app/settings/components/settings.component.html',
        directives: [
        NgModel
    ]
})

export class SettingsComponent {


    constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _authenticationService: AuthenticationService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService
        ) {

        this._layoutService.setCurrentPage('Settings');
        this._headerService.setTitle('Settings');
    }

    goToResetPassword() {
        console.log('RESET');
        this._router.navigate(['ResetPassword']);
    }

    sync() {
        console.log('Sync');
        this._router.navigate(['Sync']);
    }

    toggleVerificationCodeModal() {
        // this._modalService.toggleVerificationCodeModal();
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    logout() {
        console.log('logout');
        this._router.parent.navigate(['Starter']);
    }

}