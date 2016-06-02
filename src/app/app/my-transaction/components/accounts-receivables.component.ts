import {Component, Input, Provider} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
// import {RetailerService} from '../../shared/services/retailer.service';
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
        var vSource = 'iDSP';
        var vTempFilteredList = [];
  
        // Initial Data
        this.vSelectedRoute = 'inRoute';
        this.vFlag = 0;
        this._accountsReceivablesService.getAllReceivablesRoute(vDspId,vSource).subscribe(
            response => {
                console.log('Get response from API : ' + JSON.stringify(response.json()));
                this.setAllReceivablesRouteList(response.json().sort());
                this.setReceivablesRouteList(this.vAllReceivablesRouteList.filter(pFilter => {
                    return pFilter.sequence !== null;
                }));
                this.setSearchedReceivablesRoute(this.vReceivablesRouteList);
                for (var i = 0; i < this.vReceivablesRouteList.length; i++) {
                    var x = this.vReceivablesRouteList[i].amount;
                    this.vTotalReceivablesInRoute = (this.vTotalReceivablesInRoute + parseInt(x));
                }
                for (var j = 0; j < this.vAllReceivablesRouteList.length; j++) {
                    var y = this.vAllReceivablesRouteList[j].amount;
                    this.vTotalReceivablesAll = (this.vTotalReceivablesAll + parseInt(y));
                }
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