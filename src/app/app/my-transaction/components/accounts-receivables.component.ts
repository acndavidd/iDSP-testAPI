import {Component, Input, Provider} from 'angular2/core';
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

export class AccountsReceivablesComponent{

    vAllRetailerList: any; 
    vSearchedList: any;
    vSum: any;

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
        
        this._accountsReceivablesService.getAllRetailer().subscribe(
            response => {
                this.setAllRetailerList(response.json());
                console.log('response success');
                console.log(response.json());
                
                var x = 0;
                var vList = response.json();
                console.log(response.json().length);
                for (var i in response.json()){
                    console.log('i : '+JSON.stringify(response.json()[i].AccountReceivable[0].amount));
                    x = x+parseInt(response.json()[i].AccountReceivable[0].amount);
                }
                console.log('get sum x: '+x)
                this.setTotalReceivable(x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                this.getAllRetailer();
            },
            error => {
                console.log(error.json());
            }
        );
       
    }

   	getResize(){
        return this._matchMediaService.getMm();  
    }

    getFilter()
    {
        return this._layoutService.getFilter();
    }

    getTotalReceivable(){
        return this.vSum;
    }

    setTotalReceivable(vTotal){
        this.vSum = vTotal;
    }

    onKey(pInputText:any){
        console.log(pInputText);
        this.vSearchedList = this.vAllRetailerList.filter(retailer => {
             return retailer.AccountReceivable[0].Retailer.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
             retailer.AccountReceivable[0].Retailer.retailer_min.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
        });
    }

    getAllRetailer(){
       this.vSearchedList = this.vAllRetailerList;
    }

    getAllRetailerList(){
        return this.vAllRetailerList;
    }

    setAllRetailerList(vAllRetailerList){
        this.vAllRetailerList = vAllRetailerList;
    }

}