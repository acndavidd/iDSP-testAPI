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
    
    selectedPhone;
    zone;
    image;
    
    menuSelection:any = {
        mainMenu: true,

        account:false,
        smartService:false,
        addOns: false,
        billingDetail: false,
        balanceUsage: false,
        rewards: false,
        support: false
    };
    
    constructor(private _layoutService : LayoutService,
    private _router: Router,
    private _matchMediaService: MatchMediaService,
    private _authenticationService: AuthenticationService,
    private _headerService: HeaderService
    ){
        //this._accountService.getMobileNumberlistFromBackEnd(false);
        let min = localStorage.getItem('mobileNo');
        this.selectedPhone = min;
        this.image = null;
    }
    
    ngOnInit() {
        let min = localStorage.getItem('mobileNo');
        this.selectedPhone = min;
    }

    toggleLeftMenu() { 
        this._layoutService.toggleLeftMenu(); 
    } 
    
    getLeftMenuState() { 
        return this._layoutService.getLeftMenuState(); 
    }

    goToInventory() {
        this._router.navigate(['MainPage','Inventory']);
    }

    goToLogout() {
        this._router.navigate(['Starter','Login']);
    }

}
