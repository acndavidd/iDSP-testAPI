import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    // templateUrl: './app/basic-call-procedure/components/bcp-add-retailer-route.component.html',
    templateUrl: './app/basic-call-procedure/components/hc-bcp-add-retailer-route.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BCPAddRetailerRouteComponent {

    vUserId;
    vListRoute;
    vFilteredListRoute;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        this._layoutService.setCurrentPage('BCPAddRetailerRoute');
        this._headerService.setTitle('Add Retailer Route');
        this.vUserId = 'DSP00001';
        this.refreshRetailers();
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    refreshRetailers() {
        console.log('Get additional retailer route for Day');
        this._retailerService.queryAdditionalRetailerRoute().subscribe(
                response => {
                    console.log('Hasil response ' + response.json());
                    if (response.json().status === 'Success') {
                        console.log('Query Success');
                        this.vListRoute = response.json().result;
                        this.vFilteredListRoute = this.vListRoute;
                    } else {
                        this.vListRoute = null;
                        console.log('Query Failed');
                    }
                },
                error => {
                    console.log(error);
                }
        );
    }

    gotoBasicCallProcedure() {
        this._pageNavigationService.navigate('BasicCallProcedure', null, null);
    }

    getRetailers() {
        return this.vListRoute;
    }
}