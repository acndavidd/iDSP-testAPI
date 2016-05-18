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
    templateUrl: './app/my-transaction/components/hc-accounts-receivables.component.html',
    directives: [
        NgFor, NgModel, ROUTER_DIRECTIVES
    ],
    providers: [
        AccountsReceivablesService
    ]
})

export class AccountsReceivablesComponent {

    vAllRetailerList: any;
    vSearchedList: any;
    vSum: any;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _accountsReceivablesService: AccountsReceivablesService
        ) {

        this._layoutService.setCurrentPage('AccountsReceivables');
        this._headerService.setTitle('Accounts Receivables');

        this._accountsReceivablesService.getAllRetailer().subscribe(
            response => {
                this.setAllRetailerList(response.json());
                console.log('response success');
                console.log(response.json());
                console.log('sukses isi vAllRetailerList: ' + this.vAllRetailerList);

                var x = 0;
                console.log(response.json().length);
                for (var i = 0; i < response.json().length; i++) {
                    console.log('amount' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].amount));
                    console.log('sequence' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.Route[0].RouteDay[0].sequence));
                    console.log('retailer_name' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.retailer_name));
                    console.log('retailer_min' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.retailer_min));
                    x = x + parseInt(response.json()[i].AccountReceivable[0].amount);
                }
                console.log('get sum x: ' + x);
                this.setTotalReceivable(x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                this.getAllRetailer();
            },
            error => {
                console.log(error.json());
            }
        );

    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

    getTotalReceivable() {
        if (this.vSum == null) {
            this.setTotalReceivable(0);
        }
        return this.vSum;
    }

    setTotalReceivable(vTotal) {
        this.vSum = vTotal;
    }

    onKey(pInputText: any) {
        console.log(pInputText);
        this.vSearchedList = this.vAllRetailerList.filter(retailer => {
             return retailer.AccountReceivable[0].Retailer.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
             retailer.AccountReceivable[0].Retailer.retailer_min.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
        });
    }

    getAllRetailer() {
       this.vSearchedList = this.vAllRetailerList;
       console.log('sukses isi vsearchlist: ' + this.vSearchedList);
    }

    getAllRetailerList() {
        return this.vAllRetailerList;
    }

    setAllRetailerList(vAllRetailerList) {
        this.vAllRetailerList = vAllRetailerList;
    }

}