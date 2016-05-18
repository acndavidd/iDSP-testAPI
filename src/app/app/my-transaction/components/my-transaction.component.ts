import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';

@Component({
    templateUrl: './app/my-transaction/components/my-transaction.component.html',
    directives: [
        NgModel, ROUTER_DIRECTIVES
    ]
})


export class MyTransactionComponent {

    is_loading: boolean;
    error_msg: string;
    private vDate: Date;

    constructor (
        private _http: Http,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('MyTransaction');
        this._headerService.setTitle('My Dashboard');
        this.vDate = new Date();
    }

    test() {
        this._http.get('/check').subscribe(
                response => {
                    this.is_loading = false;
                    console.log(response.json());
                },
                error => {
                    console.log(error);
                    this.error_msg = 'failed connecting to login service';
                }
            );
    }

    getToday() {
        return this.vDate;
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    goToTargetsActuals() {
        console.log('PEGI KE TARGET ACTUAL');
        this._pageNavigationService.navigate('TargetsActuals', null, null);
    }

    goToInventory() {
        console.log('PEGI KE INVENTORY');
        this._pageNavigationService.navigate('Inventory', null, null);
    }

    goToRetailerRoute() {
        console.log('PEGI KE RETAILER ROUTE');
        this._pageNavigationService.navigate('RetailerRoute', null, null);
    }

    goToAccountsReceivables() {
        console.log('Go to Account Receivables');
        this._pageNavigationService.navigate('AccountsReceivables', null, null);
    }

    goToDSPAlerts() {
        console.log('PEGI KE DSP');
        this._pageNavigationService.navigate('DSPAlerts', null, null);
    }

    getLayout() {
        return this._layoutService.getLayout();
    }
}