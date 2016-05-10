'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';

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
        private _authenticationService:AuthenticationService
        ) {
        
        this._layoutService.setCurrentPage('Login');
	}

	login(pEvent) {
        pEvent.preventDefault();
        //For Hit API
        //this._authenticationService.login(this.vUsername,this.vPassword);

        //For By Pass Directly without API
        this._router.navigate(['MainPage','MyTransaction']);
    }

    getLoadingState(){
        return this._authenticationService.getLoadingState();
    }

    gotoForgetPassword()
    {
        this._router.navigate(['ForgotPassword']);
    }

    getErrorMessageText()
    {
    	return this._authenticationService.getError();
    }

    gotoForgotPassword(){
    }
}