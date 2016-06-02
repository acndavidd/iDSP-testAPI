import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';


@Component({
    selector: 'retailer-route',
    // templateUrl: './app/my-transaction/components/retailer-route.component.html',
    templateUrl: './app/my-transaction/components/hc-retailer-route.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers: [
        RetailerService
    ]
})

export class RetailerRouteComponent {
    private vListRetailers;
    private vListDay;
    private vSelectedDay;
    private vSelectedDate: Date;
    private vSelectedDateStr: String;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _params: RouteParams,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService
        ) {
        this.vListDay = [
            {
                'name' : 'Sunday',
                'value' : '0'
            },
            {
                'name' : 'Monday',
                'value' : '1'
            },
            {
                'name' : 'Tuesday',
                'value' : '2'
            },
            {
                'name' : 'Wednesday',
                'value' : '3'
            },
            {
                'name' : 'Thursday',
                'value' : '4'
            },
            {
                'name' : 'Friday',
                'value' : '5'
            },
            {
                'name' : 'Saturday',
                'value' : '6'
            }
        ];

        console.log(this._pageNavigationService.getCurrentParams());
        if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
            var vPreviousSelectedDay = this._pageNavigationService.getCurrentParams().selectedDay;
            this.vSelectedDay = vPreviousSelectedDay;
        } else {
            this.vSelectedDate = new Date();
            this.vSelectedDay = this.vSelectedDate.getDay();
        }
        console.log(this.vSelectedDate);

        this.refreshRetailerRoute();
        this._layoutService.setCurrentPage('RetailerRoute');
        this._headerService.setTitle('Retailer Route');

    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

    refreshRetailerRoute() {
        console.log('Refresh retailer route for Day ' + this.vSelectedDay);
        this._retailerService.queryRetailerRoute(this.vSelectedDay).subscribe(
                response => {
                    console.log('Hasil response ' + response.json());
                    if (response.json().status === 'Success') { // success login
                        console.log('Query Success');
                        this.vListRetailers = response.json().result;
                    } else { // failed login
                         this.vListRetailers = null;
                        console.log('Query Failed');
                        // this.vErrorMsg = response.json().errorMessage;
                    }
                },
                error => {
                    console.log(error);
                    // this.vErrorMsg = 'Failed connecting to login service';
                }
        );
    }

    onChangeSelectDay (pSelectedDay) {
        this.vSelectedDay = pSelectedDay;
        this.refreshRetailerRoute();
    }

    getInitialName (pRetailerName) {
        return pRetailerName.substring(0,1);
    }

// each.retailer_id, each.route_sequence
// pSelectedRetailer, pRouteSequence
    goToDetailRetailer (pSelectedRetailer) {
        console.log(pSelectedRetailer);

        let vParamsOld = {
            selectedDay: this.vSelectedDay
        };

        let vParams = {
            retailer_id: pSelectedRetailer.retailer_id,
            route_sequence: pSelectedRetailer.seq
        };

        this._pageNavigationService.navigate('DetailRetailer', vParams, vParamsOld);

        // this._router.navigate(['DetailRetailer',vParams]);
    }

}