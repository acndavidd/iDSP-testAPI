import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'inventory',
    templateUrl: './app/my-transaction/components/inventory.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ]
})

export class InventoryComponent {
	

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService
    	) 
	{

		this._layoutService.setCurrentPage('Inventory');
		this._headerService.setTitle("Inventory");
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

}