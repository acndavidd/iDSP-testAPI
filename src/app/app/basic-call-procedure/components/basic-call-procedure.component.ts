import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel, NgClass} from 'angular2/common';

@Component({
    // FOR HIT API
    // templateUrl: './app/basic-call-procedure/components/basic-call-procedure.component.html',
    // FOR HARDCODE UI
    templateUrl: './app/basic-call-procedure/components/hc-basic-call-procedure.component.html',

    directives: [
        ROUTER_DIRECTIVES,
        NgClass
    ],
    providers: [
        RetailerService
    ]
})

export class BasicCallProcedureComponent {

    private vListRoute;
    private vFilteredListRoute;
    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        // this._retailerService.getRetailer(100);
        this._layoutService.setCurrentPage('BasicCallProcedure');
        this._headerService.setTitle('Basic Call Procedure');

        this.refreshRetailerRouteBCP();
    }

    getResize() {
        return this._matchMediaService.getMm();
    }


    gotoAnotherPage() {
        // ACTUALLY BASED ON STATUS, BUT FOR NOW JUST GO TO CALL PREP FIRST
        this._pageNavigationService.navigate('CallPreparation', null, null);
    }

    // gotoAnotherPage(pSelectedRetailer) {
    //     console.log('Go to Call Preparation' + pSelectedRetailer );
    //     let vParamsOld = {};
    //     let vParams = {
    //         retailer_id: pSelectedRetailer.retailer_id,
    //         route_sequence: pSelectedRetailer.seq,
    //         call_id: pSelectedRetailer.call_id,
    //         status: pSelectedRetailer.call_status
    //     };
    //      this._pageNavigationService.navigate('BCPActivityStep', vParams, vParamsOld);
    // }

    // gotoAnotherPage(pSelectedRetailer) {
    //     console.log('Go to Call Preparation' + pSelectedRetailer );
    //     let vParamsOld = {};
    //     let vParams = {
    //         retailer_id: pSelectedRetailer.retailer_id,
    //         route_sequence: pSelectedRetailer.seq,
    //         call_id: pSelectedRetailer.call_id,
    //         status: pSelectedRetailer.call_status
    //     };
    //      this._pageNavigationService.navigate('BCPActivityStep', vParams, vParamsOld);
    // }

    getFilter() {
        return this._layoutService.getFilter();
    }

    getFilteredDate() {
        return this.vFilteredListRoute;
    }

    onKey(pInputText: any) {
        console.log(pInputText);
        this.vFilteredListRoute = this.vListRoute.filter(retailer => {
             return retailer.storeName.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
             retailer.retailerMinDetails.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
        });
    }

    refreshRetailerRouteBCP() {
        console.log('Get  retailer route for Day');
        this._retailerService.queryTask().subscribe(
                response => {
                        this.vListRoute = response.json().RetailerList;
                        this.vFilteredListRoute = this.vListRoute;
                },
                error => {
                    console.log(error);
                }
        );
    }
}