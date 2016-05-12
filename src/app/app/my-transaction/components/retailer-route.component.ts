import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerRouteService} from '../services/retailer-route-service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'retailer-route',
    templateUrl: './app/my-transaction/components/retailer-route.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ],
   	providers: [
        RetailerRouteService
    ]	
})

export class RetailerRouteComponent {
	private vListRetailers;
	private vSelectedDate: Date;
	private vSelectedDateStr: String;

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
		private _retailerRouteService: RetailerRouteService
    	) 
	{
		this.vSelectedDate = new Date();
		this.refreshRetailerRoute();
		this._layoutService.setCurrentPage('RetailerRoute');
		this._headerService.setTitle("Retailer Route");
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    refreshRetailerRoute(){
    	this.vListRetailers = this._retailerRouteService.queryRetailerRoute(this.vSelectedDate);
    }

    goToPreviousDay(){
    	//Selected Date - 1
    	
    	this.refreshRetailerRoute();

    }

    goToNextDay(){
    	//Selected Date + 1

    	this.refreshRetailerRoute();
    }


}