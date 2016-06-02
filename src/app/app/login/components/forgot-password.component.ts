import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';

@Component({
    templateUrl: './app/login/components/forgot-password.component.html',
    directives: [
        NgModel
    ]
})

export class ForgotPasswordComponent {


    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _modalService: Modal.ModalService
        ) {

        this._layoutService.setCurrentPage('ForgotPassword');

    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoLogin() {
        this._router.navigate(['Starter', 'Login']);
    }

    toggleVerificationCodeModal() {
        // this._modalService.toggleVerificationCodeModal();
    }

}