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
	
    vSearchRetailer: string;

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _router: Router,
        private _retailerService: RetailerService ,
        private _accountsReceivablesService: AccountsReceivablesService
    	) 
	{

		this._layoutService.setCurrentPage('AccountsReceivables');
		this._headerService.setTitle("Accounts Receivables");
        this._retailerService.getRetailer(100);
       // this._accountsReceivablesService
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

    getSearchRetailer(){
        //return this.vSearchRetailer;
        console.log("Coba keypress");
    }

    setSearchRetailer(pSearchRetailer: string){
        this.vSearchRetailer = pSearchRetailer;
    }

}