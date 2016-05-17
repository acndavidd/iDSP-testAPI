import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {Http} from 'angular2/http';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'dsp-alerts',
    templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ],
    providers : [
    	
    ]
})

export class DSPAlertsComponent {
    private vRetailerAlert;
	constructor (
        private _http:Http,
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService
    	) 
	{
		this._layoutService.setCurrentPage('DSPAlerts');
		this._headerService.setTitle("Alert & Threshold");
		this.loadAlert();
    }

    loadAlert(){
    	this._http.get('/getRetailerAlert',null).subscribe(
    		response => {
    			this.vRetailerAlert = response.json();
    		},
    		error => {

    		}
    	);
    }

    getRetailerAlert(){
    	return this.vRetailerAlert;
    }
	
	getResize() {
        return this._matchMediaService.getMm();  
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

}