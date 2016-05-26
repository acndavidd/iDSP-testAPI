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
    vFlag;
    vTotalReceivablesInRoute: number = 0;
    vTotalReceivablesAll: number = 0;
    vSelectedRoute;
    vRetailerSelfList: any;

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
        var vSource = 'iDSP';

        // Initial Data
        this.vSelectedRoute = 'inRoute';
        this.vFlag = 0;

        this._accountsReceivablesService.getAllReceivablesRoute( vDspId, vDate ).subscribe(
            response => {
                this.setReceivablesRouteList(response.json().result[0].v_receivables);
                this.setAllReceivablesRouteList(response.json().result[0].v_receivables_all);
                this.vTotalReceivablesInRoute = this.vReceivablesRouteList[0].ret_total_amount;
                this.vTotalReceivablesAll = this.vAllReceivablesRouteList[0].total_amount;
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
            },

            error => {
                console.log(error.json());
            });

        this._accountsReceivablesService.getRetailerSelf(vSource,vDspId).subscribe(
            response => {
                console.log('Get retailerSelf : ' + JSON.stringify(response.json()));
                this.setRetailerSelfList(response.json());
            },

            error => {
                console.log(error.json());
            });
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

    onKey(pInputText: any) {
        if (this.vFlag === 0) {
            if (pInputText.length === 0 ) {
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
            } else {
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList.filter(pFilter => {
                    return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                    pFilter.retailer_min.indexOf(pInputText) !== -1;}));
            }
        } else {
            if (pInputText.length === 0 ) {
                this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList);
            } else {
                this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList.filter(pFilter => {
                    return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                    pFilter.retailer_min.indexOf(pInputText) !== -1;
                    }));
            }
        }
    }

    setSearchedReceivablesRoute(pSearchedReceivablesRoute) {
        this.vSearchedReceivablesRouteList = pSearchedReceivablesRoute;
    }

    setReceivablesRouteList(pReceivablesRouteList) {
        this.vReceivablesRouteList = pReceivablesRouteList;
    }

    setAllReceivablesRouteList(pAllReceivablesRouteList) {
        this.vAllReceivablesRouteList = pAllReceivablesRouteList;
    }

    setRetailerSelfList(pRetailerSelfList) {
        this.vRetailerSelfList = pRetailerSelfList;
    }

    getRetailerSelfList() {
        return this.vRetailerSelfList;
    }

    searchFilter(pInputText: any) {
        console.log('in searchFilter : ' + pInputText.length);
        console.log('initial selectedRoute : ' + this.vSelectedRoute);
        
        if (pInputText.length > 0) {
            if (this.vSelectedRoute === 'allRoute') {
                this.vFlag = 1;
                this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList.filter(pFilter => {
                    return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                    pFilter.retailer_min.indexOf(pInputText) !== -1;
                }));
            } else {
                this.vFlag = 0;
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList.filter(pFilter => {
                    return pFilter.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                    pFilter.retailer_min.indexOf(pInputText) !== -1;
                }));
            }
        } else {
            if (this.vSelectedRoute === 'allRoute') {
               this.vFlag = 1;
               this.setSearchedReceivablesRoute(this.vAllReceivablesRouteList);
            } else {
               this.vFlag = 0;
               this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
            }
        }
    }

    getRoute(pStr: any) {
        console.log('You select: ' + pStr);
        this.vSelectedRoute = pStr;

        if (this.vSelectedRoute === 'allRoute') {
            this.vFlag = 1;
        } else {
            this.vFlag = 0;
        }
    }
}