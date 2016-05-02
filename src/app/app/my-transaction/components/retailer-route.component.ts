import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'retailer-route',
    templateUrl: './app/my-transaction/components/retailer-route.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ]
})

export class RetailerRouteComponent {
	

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService
    	) 
	{

		this._layoutService.setCurrentPage('RetailerRoute');
		this._headerService.setTitle("Retailer Route");
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

}