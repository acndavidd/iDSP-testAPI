'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {SQLiteService} from '../../shared/services/sqlite.service';

@Component({
    selector: 'login',
    templateUrl: './app/login/components/login.component.html',
    directives: [
        NgModel
    ],
})

export class LoginComponent {
    vUsername: string;
    vPassword: string;
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService: AuthenticationService,
        private _modalService: ModalService,
        private _pageNavigationService: PageNavigationService,
        private _sqliteService: SQLiteService ) {

        this._layoutService.setCurrentPage('Login');
    }

    login(pEvent) {
        pEvent.preventDefault();
        // For Hit API
        // this._authenticationService.login(this.vUsername,this.vPassword);

        // For By Pass Directly without API
        // this._router.navigate(['MainPage','MyTransaction']);
        // let vCurrentContext = this;
        // vCurrentContext._sqliteService.executeQuery('CREATE TABLE IF NOT EXISTS test_table(anjay varchar(100))').subscribe( response => {
        //     vCurrentContext._sqliteService.executeQuery('INSERT INTO test_table VALUES (?)', ['anjay']).subscribe( response => {
        //         vCurrentContext._sqliteService.executeQuery('SELECT anjay FROM test_table').subscribe( response => {
        //             console.log(response.rows.item(0).anjay);
        //             vCurrentContext._router.navigate(['Mpin']);
        //         });
        //     }, error => {
        //         console.log(error);
        //     });
        // }, error => {
        //     console.log(error);
        // });

        this._router.navigate(['Mpin']);
    }

    getLoadingState() {
        return this._authenticationService.getLoadingState();
    }

    gotoForgetPassword() {
        this._router.navigate(['ForgotPassword']);
    }

    getErrorMessageText() {
        return this._authenticationService.getError();
    }

    toggleVerificationCodeModal() {
        this._modalService.toggleVerificationCodeModal();
    }
}