import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {Layout} from '../../../models/layout';
import {HeaderService} from '../../shared/services/header.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'home',
    templateUrl: 'app/shared/components/home.component.html'
})

export class HomeComponent {
    private vDate: Date;

    constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService) {
        this._layoutService.setCurrentPage('Home');
        this._headerService.setTitle('Home');
        this.vDate = new Date();
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
