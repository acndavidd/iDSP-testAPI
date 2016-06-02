import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {InventoryService} from '../../shared/services/inventory.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'inventory',
    templateUrl: './app/my-transaction/components/inventory.component.html',
    // templateUrl: './app/my-transaction/components/hc-inventory.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers: [
        InventoryService
    ]
})

export class InventoryComponent {

    vProductList;
    vSelectedDate: String;
    vLoadShow = true;
    vPhysicalShow = false;
    vSubPhysicalMenuShow = [];
    vSubLoadMenuShow = [];

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _inventoryService: InventoryService
        ) {
        // this.vSelectedDate = '20160429003012';
        this._layoutService.setCurrentPage('Inventory');
        this._headerService.setTitle('Inventory');
        this.toggleFilterInventory();
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

    showMenuLoad() {
        this.vLoadShow = true;
        this.vPhysicalShow = false;
        this.toggleFilterInventory();
    }

    showMenuPhysical() {
        this.vLoadShow = false;
        this.vPhysicalShow = true;
        this.toggleFilterInventory();
        this._inventoryService.getPhysicalInventoryList('anjay1', 'physical', 'anjay3', 'anjay4', 'anjay5', 'anjay6');
    }

    subPhysicalMenuShow(indexArr) {
        console.log(indexArr);
        this.vSubPhysicalMenuShow[indexArr] = !this.vSubPhysicalMenuShow[indexArr];
    }

    subLoadMenuShow(indexArr) {
        console.log(indexArr);
        this.vSubLoadMenuShow[indexArr] = !this.vSubLoadMenuShow[indexArr];
    }

    getProductList() {
        return this._inventoryService.productList;
    }

    isProductListLoaded() {
        return this._inventoryService.productListStatus;
    }

    toggleFilterInventory() {
        this._layoutService.toggleFilterInventory(this.vLoadShow, this.vPhysicalShow);
    }

}