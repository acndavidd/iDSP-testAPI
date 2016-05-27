import {Component, OnInit, NgZone} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Modal} from '../../shared/services/modal.service';
import {RetailerService} from '../../shared/services/retailer.service';

declare var ga: any;
declare var Camera: any;
declare var navigator: any;
declare var configChannel: any;

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent implements OnInit  {

    image;
    vCurrentPage;
    vGoToPage;

    constructor(private _layoutService: LayoutService,
    private _router: Router,
    private _matchMediaService: MatchMediaService,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService,
    private _modalService: Modal.ModalService
    ) {
        this.image = null;
    }

    ngOnInit() {

    }

    toggleLeftMenu() {
        this._layoutService.toggleLeftMenu();
    }

    getLeftMenuState() {
        return this._layoutService.getLeftMenuState();
    }

    checkCurrentPage(pGoToPage: string) {
        this.vCurrentPage = this._layoutService.getCurrentPage();
        console.log(pGoToPage + ' - ' + this.vCurrentPage);

        if (pGoToPage === this.vCurrentPage) {
            this.toggleLeftMenu();
        } else {
            this._pageNavigationService.navigate(pGoToPage, null, null);
        }
    }

    goToHome() {
        this.vGoToPage = 'Home';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToMyDashboard() {
        this.vGoToPage = 'MyTransaction';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToTargetsActualsMD() {
        this.vGoToPage = 'TargetsActuals';
        this._pageNavigationService.addListPreviousData('MyTransaction', null);
        this.checkCurrentPage(this.vGoToPage);
    }

    goToInventory() {
        this.vGoToPage = 'Inventory';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToRetailerRoute() {
        this.vGoToPage = 'RetailerRoute';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToAccountReceivables() {
        this.vGoToPage = 'AccountsReceivables';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToThresholdAlerts() {
        this.vGoToPage = 'DSPAlerts';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToBasicCallProcedure() {
        this.vGoToPage = 'BasicCallProcedure';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToCloseOfTheDay() {
        this.vGoToPage = 'CloseDay';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToTargetsActualsCD() {
        this.vGoToPage = 'TargetsActuals';
        this._pageNavigationService.addListPreviousData('CloseDay', null);
        this.checkCurrentPage(this.vGoToPage);
    }

    goToVisitedRetailerRoute() {
        this.vGoToPage = 'VisitedRetail';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToCollection() {
        this.vGoToPage = 'Collection';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToCDUnservedOrder() {
        this.vGoToPage = 'CDUnservedOrder';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToRemittance() {
        this.vGoToPage = 'Remittance';
        this.checkCurrentPage(this.vGoToPage);
    }

    goToStockReturn() {
        this.vGoToPage = 'StockReturn';
        this.checkCurrentPage(this.vGoToPage);
    }

    toggleLogout() {
        this._authenticationService.logout();    
    }
}
