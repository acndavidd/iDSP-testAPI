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
    // templateUrl: './app/my-transaction/components/hc-accounts-receivables.component.html',
     templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
    directives: [
        NgFor, NgModel, ROUTER_DIRECTIVES
    ],
    providers: [
        AccountsReceivablesService
    ]
})

export class AccountsReceivablesComponent {

    vReceivablesRouteList: any;
    vSearchedReceivablesRouteList: any;
    vAllReceivablesRouteList: any;
    vSum: any;
    vFlag = 0;

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

        this._accountsReceivablesService.getAllReceivablesRoute( vDspId, vDate ).subscribe(
            response => {
                this.setReceivablesRouteList(response.json().result[0].v_receivables);
                this.setAllReceivablesRouteList(response.json().result[0].v_receivables_all);
                console.log( 'TEMP 1 ' + this.vReceivablesRouteList + ' length: ' + this.vReceivablesRouteList.length );
                console.log( 'TEMP 2 ' + this.vAllReceivablesRouteList + ' length: ' + this.vAllReceivablesRouteList.length );
                console.log(JSON.stringify(response.json()));
                console.log(response.json().result.length);
                this.setTotalReceivable(response.json().result[0].v_receivables[0].ret_total_amount);
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
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
        if ( this.vSum === null ) {
            this.setTotalReceivable(0);
        }
        return this.vSum;
    }

    setTotalReceivable(vTotal) {
        this.vSum = vTotal;
    }

    onKey(pInputText: any) {
        if (this.vFlag === 0) {
            this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
            this.setTotalReceivable(this.vReceivablesRouteList[0].ret_total_amount);
            this.setSearchedReceivablesRoute(this.vReceivablesRouteList.filter(pFilter => {
                 return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                 pFilter.retailer_min.indexOf(pInputText) !== -1;
            }));
        } else {
            this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList);
            this.setTotalReceivable(this.vAllReceivablesRouteList[0].total_amount);
            this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList.filter(pFilter => {
                return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                pFilter.retailer_min.indexOf(pInputText) !== -1;
            }));
        }
    }

    setSearchedReceivablesRoute(pSearchedReceivablesRoute) {
       this.vSearchedReceivablesRouteList = pSearchedReceivablesRoute;
       console.log('sukses isi vSearchedReceivablesRouteList: ' + this.vReceivablesRouteList);
    }

    setReceivablesRouteList(pReceivablesRouteList) {
        this.vReceivablesRouteList = pReceivablesRouteList;
    }

    setAllReceivablesRouteList(pAllReceivablesRouteList) {
        this.vAllReceivablesRouteList = pAllReceivablesRouteList;
    }

    getAllReceivables(pInputText: any) {
        console.log('in get AllReceivables : ' + pInputText);
        this.vFlag = 1;
        this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList);
        this.setTotalReceivable(this.vAllReceivablesRouteList[0].total_amount);
        if (pInputText.length > 0) {
            this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList.filter(pFilter => {
                return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                pFilter.retailer_min.indexOf(pInputText) !== -1;
            }));
        }
    }
}