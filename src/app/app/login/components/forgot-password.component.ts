import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgModel} from 'angular2/common';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';

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
        private _modalService: ModalService
    	) {

		this._layoutService.setCurrentPage('ForgetPassword');
		
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

    gotoLogin()
    {
    	this._router.navigate(['Starter', 'Login']);
    }

    toggleVerificationCodesModal() {
        this._modalService.toggleVerificationCodesModal();
    }

}