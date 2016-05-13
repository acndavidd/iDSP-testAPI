import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/detail-retailer.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

export class DetailRetailerComponent {

    vSelectedRetail;
    vSelectedRetailSeq;
    vSelectedRetailId;
    vMenuShow = false;
    vArrowMap = false;
	constructor (
		private _layoutService: LayoutService,
		private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
		private _retailerService: RetailerService,
        private _router: Router,
        private _params: RouteParams,
        private _pageNavigationService: PageNavigationService
		) 

	{
        console.log(this._pageNavigationService.getCurrentParams());
        if(this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== ''){
            this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
            this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
        }
        else
        {
            console.log("Retailer ID not found");
        }
		this.vSelectedRetail = this._retailerService.getRetailerDetail(this.vSelectedRetailId);
        console.log(this.vSelectedRetail);

		this._layoutService.setCurrentPage('DetailRetailer');
		this._headerService.setTitle("Detail Retailer");
        console.log('in detail retailer for retailer id ' +  this.vSelectedRetailId);
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

   getRetailer()
    {
    	return this.vSelectedRetail;
    }

    subMenuShow()
    {
        this.vMenuShow = !this.vMenuShow;
        this.vArrowMap = !this.vArrowMap;
    }

    goToInventoryRetailer(pRetailerId){
        console.log(pRetailerId);

        let vParamsOld = this._pageNavigationService.getCurrentParams();

        let vParams = {
        };


        this._pageNavigationService.navigate('RetailerInventory', vParams, vParamsOld );

    }
    //  getRetailerAddress()
    // {
    // 	return this._retailerService.getRetailerAddress();
    // }
}