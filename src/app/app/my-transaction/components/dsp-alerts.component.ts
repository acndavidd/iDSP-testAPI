import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {Http} from 'angular2/http';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'dsp-alerts',
    templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers : [

    ]
})

export class DSPAlertsComponent {
    private vRetailerAlert;
    private vAllRetailerAlert;
    private vValueSegmentFilter;
    constructor (
        private _http: Http,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService
        ) {
        this._layoutService.setCurrentPage('DSPAlerts');
        this._headerService.setTitle('Alert & Threshold');
        this.vValueSegmentFilter = '';
        this.loadAlert();
    }

    loadAlert() {
        this._http.get('/testSP', null).subscribe(
            response => {
                this.vRetailerAlert = this.vAllRetailerAlert = response.json();
            },
            error => {

            }
        );
    }

    onFilterValueSegment(pSelectedValueSegment) {
        this.vValueSegmentFilter = pSelectedValueSegment;
        if (this.vValueSegmentFilter !== '') {
            this.vRetailerAlert = this.vAllRetailerAlert.filter(alert => alert.value_segment === this.vValueSegmentFilter);
        } else {
            this.vRetailerAlert = this.vAllRetailerAlert;
        }
    }

    onFilterThreshold(pThresholdValue) {
        if (pThresholdValue !== '')
            this.vRetailerAlert = this.vAllRetailerAlert.filter(alert => alert.threshold_hit.indexOf(pThresholdValue) !== -1);
        else this.vRetailerAlert = this.vAllRetailerAlert;
    }

    getRetailerAlert() {
        return this.vRetailerAlert;
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

}