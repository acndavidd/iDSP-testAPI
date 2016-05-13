import {Component, Input, OnInit, Provider} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {AccountsReceivablesService} from '../services/accounts-receivables-service';
import {NgFor, NgModel} from 'angular2/common';


@Component({
	selector: 'accounts-receivables',
    templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
	directives: [
		NgFor,NgModel, ROUTER_DIRECTIVES
    ],
    providers: [
    	AccountsReceivablesService
    ]
})

export class AccountsReceivablesComponent implements OnInit{

    vTotal: string;
    vAllRetailerList: any [] = [];
    vSearchedList: any [] = [];
       
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

    onKey(pInputText:any){
        console.log(pInputText);
        this.vSearchedList = this.vAllRetailerList.filter(retailer => {
             return retailer.retailerName.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
             retailer.retailerID.indexOf(pInputText) !== -1;
        });
    }

    getAllRetailer(){
       this.vAllRetailerList = this._accountsReceivablesService.getAllRetailer();
       this.vSearchedList = this.vAllRetailerList;
       console.log(this.vAllRetailerList);
    }

    ngOnInit(){
        this.getAllRetailer();
    }

    getAllRetailerList(){
        return this.vAllRetailerList;
    }

    setAllRetailerList(vAllRetailerList){
        this.vAllRetailerList = vAllRetailerList;
    }

}