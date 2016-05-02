import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
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
        private _matchMediaService: MatchMediaService
        ) {

		this._layoutService.setCurrentPage('Settings');
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

    logout()
    {
        console.log('logout');
    	this._router.parent.navigate(['Starter']);
    }

}