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
        ) {
        console.log(this._pageNavigationService.getCurrentParams());
        if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
            this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
            this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
        } else {
            console.log('Retailer ID not found');
        }
        console.log('in detail retailer for retailer id ' +  this.vSelectedRetailId);

        this._retailerService.queryRetailerSummary(this.vSelectedRetailId).subscribe(
            response => {
                if (response.json().status === 'Success') {// success login
                    console.log('Query Success' + JSON.stringify(response.json().result));
                    this.vSelectedRetail = response.json().result;

                    this.vSelectedRetail.birthday = new Date(this.vSelectedRetail.birthday);
                    console.log('Abis format' + JSON.stringify(this.vSelectedRetail));
                } else {// failed login
                    console.log('Query Failed');
                    this.vSelectedRetail = null;
                    // this.vErrorMsg = response.json().errorMessage;
                }
            },
            error => {
                console.log(error);
                // this.vErrorMsg = 'Failed connecting to login service';
            });
        // console.log(this.vSelectedRetail);

        this._layoutService.setCurrentPage('DetailRetailer');
        this._headerService.setTitle('Detail Retailer');

    }

    getSelectedRetailer() {
        return this.vSelectedRetail;
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getRetailer() {
        return this.vSelectedRetail;
    }

    subMenuShow() {
        this.vMenuShow = !this.vMenuShow;
        this.vArrowMap = !this.vArrowMap;
    }

    gotoBCPActivityStep() {
        // this._router.navigate(['BCPActivityStep']);
    }

    goToInventoryRetailer(pRetailerId) {
        console.log(pRetailerId);

        let vParamsOld = this._pageNavigationService.getCurrentParams();

        let vParams = {
        };


        this._pageNavigationService.navigate('RetailerInventory', vParams, vParamsOld );

    }
    //   getRetailerAddress()
    //  {
    //   return this._retailerService.getRetailerAddress();
    //  }
}