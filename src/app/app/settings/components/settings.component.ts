import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'settings',
    templateUrl: './app/settings/components/settings.component.html',
        directives: [
        NgModel, ROUTER_DIRECTIVES
    ]
})

export class SettingsComponent {
	

	constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService
        ) {

		this._layoutService.setCurrentPage('Settings');
        this._headerService.setTitle("Settings");
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }
    
    goToResetPassword(){
        console.log('RESETTT');
    	this._router.navigate(['ResetPassword']);
    }

    logout()
    {
        console.log('logout');
    	this._router.parent.navigate(['Starter']);
    }

}