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
    //templateUrl: './app/my-transaction/components/hc-accounts-receivables.component.html',
    templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
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

        var vDspId = 'DSP00001';
        var vDate = new Date().getDay();
        console.log('vDate: ' + vDate);

        this._accountsReceivablesService.getAllRetailer(vDspId,vDate).subscribe(
            response => {
                this.setAllRetailerList(response.json().result);
                console.log('response success');
                console.log(JSON.stringify(response.json()));
                console.log(response.json().result.length);
                this.setTotalReceivable(parseInt(response.json().result[0].total_amount).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
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
             return retailer.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
             retailer.retailer_min.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
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