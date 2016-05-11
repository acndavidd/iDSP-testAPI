import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
//import {NgModel} from 'angular2/common';
import {AccountsReceivablesService} from '../services/accounts-receivables-service';

@Component({
	selector: 'accounts-receivables',
    templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ],
    providers: [
    	AccountsReceivablesService
    ]
})

export class AccountsReceivablesComponent {
	
	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _router: Router,
        private _retailerService: RetailerService
    	) 
	{

		this._layoutService.setCurrentPage('AccountsReceivables');
		this._headerService.setTitle("Accounts Receivables");
        this._retailerService.getRetailer(100);
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    getSearch()
    {
        return this._layoutService.getSearch();
    }

    gotoDetailRetailer()
    {
        this._layoutService.setOldCurrentPage('AccountsReceivables');
        this._router.navigate(['DetailRetailer']);
    }

}