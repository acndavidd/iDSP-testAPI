'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';


declare var ga:any;

@Component({
    selector: 'login',
    templateUrl: './app/login/components/login.html',
    directives: [
        NgModel
    ],
})

export class LoginComponent {
    username: string;
    password: string;
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService:AuthenticationService
        ) {
        
        this._layoutService.setCurrentPage('Login');
	}

	login(event) {
        event.preventDefault();
        this._authenticationService.login(this.username,this.password);
    }

    getLoadingState(){
        return this._authenticationService.getLoadingState();
    }

    getErrorMessageText()
    {
    	return this._authenticationService.getError();
    }

    gotoForgotPassword(){
        //this._authenticationService.checkToken();
        this._router.navigate(['ForgotPassword']);
    }
}