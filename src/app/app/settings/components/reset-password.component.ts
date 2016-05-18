import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'reset-password',
    templateUrl: './app/settings/components/reset-password.component.html',
        directives: [
        NgModel
    ]
})

export class ResetPasswordComponent {


    constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService
        ) {

        this._layoutService.setCurrentPage('ResetPassword');
        this._headerService.setTitle('Reset Password');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

}