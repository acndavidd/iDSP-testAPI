import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/basic-call-procedure.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BasicCallProcedureComponent {

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        this._retailerService.getRetailer(100);
        this._layoutService.setCurrentPage('BasicCallProcedure');
        this._headerService.setTitle('Basic Call Procedure');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoCallPreparation() {
        this._pageNavigationService.navigate('CallPreparation', null, null);
        //this._pageNavigationService.navigate('BCPCollection', null, null);
    }
}