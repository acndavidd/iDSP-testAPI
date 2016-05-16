import {Component, OnInit, NgZone} from 'angular2/core';
import { Router } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {AuthenticationService} from '../../shared/services/authentication.service';

import {ModalService} from '../../shared/services/modal.service';
import {RetailerService} from '../../shared/services/retailer.service';

declare var ga:any;
declare var Camera:any;
declare var navigator:any;
declare var configChannel:any;

@Component({
    selector: 'left-menu',
    templateUrl: 'app/shared/components/left-menu.component.html'
})
export class LeftMenuComponent implements OnInit  {
    
    image;
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _matchMediaService: MatchMediaService,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService
    ){
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
    
    goToMyDashboard() {
        this._router.navigate(['MainPage','MyTransaction']);
    }
    
    goToTargets() {
        this._router.navigate(['MainPage','TargetsActuals']);
    }
    
    goToInventory() {
        this._router.navigate(['MainPage','Inventory']);
    }

    goToRetailerRoute() {
        this._router.navigate(['MainPage','RetailerRoute']);
    }

    goToAccountReceivables() {
        this._router.navigate(['MainPage','AccountsReceivables']);
    }

    goToThresholdAlerts() {
        this._router.navigate(['MainPage','DSPAlerts']);
    }

    goToBasicCallProcedure() {
        this._router.navigate(['MainPage','BasicCallProcedure']);
    }

    goToCloseOfTheDay() {
        this._router.navigate(['MainPage','CloseDay']);
    }

    goToTargetsActuals() {
        this._router.navigate(['MainPage','CDTargetsActuals']);
    }

    goToVisitedRetailerRoute() {
        this._router.navigate(['MainPage','VisitedRetail']);
    }

    goToCollection() {
        this._router.navigate(['MainPage','Collection']);
    }

    goToRemittance() {
        //this._router.navigate(['MainPage','DSPAlerts']);
    }

    goToStockReturn() {
        //this._router.navigate(['MainPage','DSPAlerts']);
    }

    goToLogout() {
        this._router.navigate(['Starter','Login']);
    }

}
