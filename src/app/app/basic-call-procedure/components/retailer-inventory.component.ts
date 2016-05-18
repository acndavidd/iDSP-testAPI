import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/retailer-inventory.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class RetailerInventoryComponent {

    vMenuShow = false;
    vArrowMap = false;
    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService
        ) {
        this._layoutService.setCurrentPage('RetailerInventory');
        this._headerService.setTitle('Retailer Inventory');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    subMenuShow() {
        this.vMenuShow = !this.vMenuShow;
        this.vArrowMap = !this.vArrowMap;
    }

    //  getRetailerAddress()
    // {
    //  return this._retailerService.getRetailerAddress();
    // }
}