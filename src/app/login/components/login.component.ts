'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';

declare var ga:any;

@Component({
    selector: 'login',
    templateUrl: './app/login/components/login.html',
    directives: [
        NgModel
    ],
})

export class LoginComponent {
    userId: string;
    password: string;
    constructor (private _router: Router,
        private _authenticationService:AuthenticationService) {
        
	}

	login(event) {
        event.preventDefault();
        console.log(this.userId + " aaaa " + this.password);
        this._authenticationService.login(this.userId,this.password);
    }

    getErrorMsgText(){
    	return "Error Bro";
    }
}