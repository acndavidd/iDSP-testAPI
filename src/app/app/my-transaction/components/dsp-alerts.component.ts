import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {DSPAlertsService} from '../services/dsp-alerts.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'dsp-alerts',
    templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ],
    providers : [
    	DSPAlertsService
    ]
})

export class DSPAlertsComponent {
    private vRetailerAlert;
	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
		private vDSPAlertService:DSPAlertsService
    	) 
	{
		this._layoutService.setCurrentPage('DSPAlerts');
		this._headerService.setTitle("Alert & Threshold");
		this.loadAlert();
    }

    loadAlert(){
    	this.vDSPAlertService.getDSPAlert().subscribe(
    		response => {
    			this.vRetailerAlert = response.json();
    			console.log(response.json());
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