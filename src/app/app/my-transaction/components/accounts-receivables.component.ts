import {Component, Input} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {AccountsReceivablesService} from '../services/accounts-receivables-service';
import { AllRetailer } from './all-retailer';


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

export class AccountsReceivablesComponent{

    vTotal: string;
    retailerList: AllRetailer[];
    
	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _router: Router,
        private _accountsReceivablesService: AccountsReceivablesService
    	) 
	{

		this._layoutService.setCurrentPage('AccountsReceivables');
		this._headerService.setTitle("Accounts Receivables");
        this._accountsReceivablesService.getAllRetailer().then(retailers => this.retailerList = retailers);

    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    getFilter()
    {
        return this._layoutService.getFilter();
    }

    getSearchRetailer(){
        this.setTotalReceivable('35000');
    }

    getTotalReceivable(){
        return this._accountsReceivablesService.getTotalReceivable();
    }

    setTotalReceivable(pTotal){
        this.vTotal = pTotal;
    }

    onKey(value:string){
        console.log ('test onkey');
    }

    Retailers($scope){
        $scope.init = function(list){
            console.log('Test looping div:' +list);
        }

        $scope.retailers = this.retailerList;
    }

}