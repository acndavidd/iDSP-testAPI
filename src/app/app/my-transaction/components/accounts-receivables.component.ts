import {Component, Input, Provider} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {AccountsReceivablesService} from '../services/accounts-receivables-service';
import {NgFor, NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';

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
    vFlag;
    vTotalReceivablesInRoute: number = 0;
    vTotalReceivablesAll: number = 0;
    vSelectedRoute;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _modalService: Modal.ModalService,
        private _accountsReceivablesService: AccountsReceivablesService
        ) {

        this._layoutService.setCurrentPage('AccountsReceivables');
        this._headerService.setTitle('Accounts Receivables');

        var vDspId = 'DSP00001';
        var vTempFilteredList = [];
  
        // Initial Data
        this.vSelectedRoute = 'inRoute';
        this.vFlag = 0;
        this._accountsReceivablesService.getAllReceivablesRoute(vDspId).subscribe(
            response => {
                console.log('Get response from API : ' + JSON.stringify(response.json()));

                // sorted object by route number
                this.setAllReceivablesRouteList(response.json()[0].sort(function(a, b) {
                if (a.sequence === null && b.sequence === null) {
                    return 0;
                }
                if (a.sequence === null) {
                    return 1;
                }
                if (b.sequence === null) {
                    return -1;
                }
                if (a.sequence > b.sequence) {
                    return 1;
                }
                if (a.sequence < b.sequence) {
                    return -1;
                } else {
                    return 0;
                }
            }));
                // set default value to display: all retailer which has route for today's task
                this.setReceivablesRouteList(this.vAllReceivablesRouteList.filter(pFilter => {
                    return pFilter.sequence !== null;
                }));
                
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
                this.vTotalReceivablesInRoute = response.json()[2].total_inroute_amount;
                this.vTotalReceivablesAll = response.json()[1].total_receivable_amount;
                },
            error => {
                console.log('in acc component' + error.json());
                this._modalService.toggleModal('Failed to connect to service', Modal.ModalType.ERROR);
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

    searchFilter(pInputText: any) {
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