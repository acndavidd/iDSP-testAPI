import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {AccountReceivablesService} from '../services/account-receivables-service';

@Component({
	selector: 'accounts-receivables',
    templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ],
    providers: [
    	ROUTER_PROVIDERS,
    	AccountReceivablesService
    ]
})

export class AccountsReceivablesComponent {
	

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService
    	) 
	{

		this._layoutService.setCurrentPage('AccountsReceivables');
		this._headerService.setTitle("Accounts Receivables");
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    getSearch()
    {
        return this._layoutService.getSearch();
    }

}