'use strict';

import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Layout} from '../../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';


declare var ga:any;

@Component({
    selector: 'verification',
    templateUrl: './app/verification/components/verification.component.html',
    directives: [
        NgModel
    ],
})

export class VerificationComponent {
    userId: string;
    password: string;
    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _authenticationService:AuthenticationService
        ) {
        
        this._layoutService.setCurrentPage('AuthLogin');
	}

	login(event) {
        event.preventDefault();
        this._authenticationService.login(this.userId,this.password);
        this._router.navigate(['MainPage', 'MyTransaction']);
    }

    getErrorMessageText(){
    	return "Error Bro";
    }
}