import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'dsp-alerts',
    templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ]
})

export class DSPAlertsComponent {
	

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
		private _pageNavigationService : PageNavigationService
    	) 
	{
		console.log('Enter DSP ALerts Page');
		this._layoutService.setCurrentPage('DSPAlerts');
		this._headerService.setTitle("DSP Alerts");
		console.log(this._pageNavigationService.getParams());
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }
}