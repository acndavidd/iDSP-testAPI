import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {InventoryService} from '../services/inventory.service';
import {GlobalService} from '../../shared/services/global.service';

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

    vProductLoadList;
    vSearchedProductPhysicalList;
    vProductPhysicalList;
    vSelectedDate: String;
    vLoadShow = true;
    vPhysicalShow = false;
    vSubPhysicalMenuShow = [];
    vSubLoadMenuShow = [];
    x:number = 0;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _inventoryService: InventoryService,
        private _globalService: GlobalService
        ) {
        this._layoutService.setCurrentPage('Inventory');
        this._headerService.setTitle('Inventory');
        this.toggleFilterInventory();

        var vUsername = 'anjay1';
        var vRecordStart = '1';
        var vRecordEnd = '6';
        var vCorporateID = 'corph';
        var vBranchID = 'branch';
        var vTransKey = 'b6a9c7b70f957d17802ec4ea4726302e5f3627e3c03d5075db820ce25685eaca';
        var vRequestRefNo = '123456789012';
        var vRequestTimestamp = '1377683895';
        var vTerminalID = 'term001';
        var vAddress = 'Makati';
        var vZipCode = '1226';

        // GET LOAD
        this._inventoryService.getDSPLoadInventoryList(vUsername, vCorporateID, vBranchID, vTransKey, vRequestRefNo, vRequestTimestamp, vTerminalID, vAddress, vZipCode).subscribe(
            response => {
                let vResponse = response.json();
                console.log('2: ' + JSON.stringify(vResponse));

                if (vResponse.status === 200) {
                   this.vProductLoadList = vResponse.productList;
                } else {
                }
            },
            error => {

            }
        );

        // GET PHYSICAL
        this._inventoryService.getDSPPhysicalInventoryList(vUsername, vRecordStart, vRecordEnd).subscribe(
            response => {
                let vResponse = response.json();
                console.log('2: ' + JSON.stringify(vResponse));

                if (vResponse.status === 200) {
                   this.vProductPhysicalList = vResponse.productList;
                   this.vSearchedProductPhysicalList = vResponse.productList;
                } else {
                }
            },
            error => {

            }
        );
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
    }

    subPhysicalMenuShow(indexArr) {
        console.log(indexArr);
        this.vSubPhysicalMenuShow[indexArr] = !this.vSubPhysicalMenuShow[indexArr];
    }

    subLoadMenuShow(indexArr) {
        console.log(indexArr);
        this.vSubLoadMenuShow[indexArr] = !this.vSubLoadMenuShow[indexArr];
    }

    getPhysicalProductList() {
        this.vProductPhysicalList = this._inventoryService.vPhysicalProductList;
        return this.vProductPhysicalList;
    }

    getLoadProductList() {
        this.vProductLoadList = this._inventoryService.vLoadProductList;
        return this.vProductLoadList;
    }

    toggleFilterInventory() {
        this._layoutService.toggleFilterInventory(this.vLoadShow, this.vPhysicalShow);
    }

    // toNumber(pStr) {
    //     if(pStr === '0') {
    //         return this.x;
    //     } else {
    //         return parseInt(pStr);
    //     }
    // }

    onKey(pInputText: any) {
        console.log('1111 : ' +pInputText);

        if (pInputText.length === 0) {
            this.vSearchedProductPhysicalList = this.vProductPhysicalList;
        } else {
            this.vSearchedProductPhysicalList = this.vProductPhysicalList.filter(pFilter => {
                return pFilter.productName.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;});
        }
    }

    getBrand() {
        return this._globalService.getBrand();
    }

    getProductID() {
        return this._globalService.getProductID();
    }
}