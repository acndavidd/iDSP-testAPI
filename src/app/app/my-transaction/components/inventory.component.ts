import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {InventoryService} from '../../shared/services/inventory.service';

@Component({
	selector: 'inventory',
    templateUrl: './app/my-transaction/components/inventory.component.html',
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
    vSubMenuShow = [];

	constructor (
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _inventoryService: InventoryService
    	) 
	{
        // this.vSelectedDate = "20160429003012";
		this._layoutService.setCurrentPage('Inventory');
		this._headerService.setTitle("Inventory");
        this._inventoryService.getProductListPhysical('asdasd','asd');
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
    }

    showMenuPhysical() {
    	this.vLoadShow = false;
    	this.vPhysicalShow = true;
    }

    subMenuShow(indexArr)
    {
        console.log(indexArr);
        //if(this.vSubMenuShow[indexArr] === undefined || this.vSubMenuShow[indexArr] === null) this.vSubMenuShow[indexArr] = false;
        this.vSubMenuShow[indexArr] = !this.vSubMenuShow[indexArr];
    }


    getProductList(){
        return this._inventoryService.productList;
    }

    isProductListLoaded(){
        return this._inventoryService.productListStatus;   
    }

}