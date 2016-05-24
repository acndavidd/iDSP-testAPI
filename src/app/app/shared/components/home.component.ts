import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {Layout} from '../../../models/layout';
import {Modal} from '../services/modal.service';
import {HeaderService} from '../../shared/services/header.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AuthenticationService} from '../services/authentication.service';

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
        private _pageNavigationService: PageNavigationService,
        private _modalService: Modal.ModalService,
        private _authenticationService: AuthenticationService) {
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

    goToMyDashboard() {
        this._pageNavigationService.navigate('MyTransaction', null, null);
    }

    goToTargetsActuals() {
        this._pageNavigationService.navigate('TargetsActuals', null, null);
    }

    goToInventory() {
        this._pageNavigationService.navigate('Inventory', null, null);
    }

    goToRetailerRoute() {
        this._pageNavigationService.navigate('RetailerRoute', null, null);
    }

    goToAccountsReceivables() {
        this._pageNavigationService.navigate('AccountsReceivables', null, null);
    }

    goToDSPAlerts() {
        this._pageNavigationService.navigate('DSPAlerts', null, null);
    }
    goToBasicCallProcedure() {
        this._pageNavigationService.navigate('BasicCallProcedure', null, null);
    }
    goToRemittance() {
        this._pageNavigationService.navigate('Remittance', null, null);
    }
    goToStockReturn() {
        this._pageNavigationService.navigate('StockReturn', null, null);
    }
    toggleLogout() {
        this._authenticationService.logout();
    }
    getLayout() {
        return this._layoutService.getLayout();
    }
}
