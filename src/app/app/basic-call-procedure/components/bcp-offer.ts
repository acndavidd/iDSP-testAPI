import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/bcp-offer.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        RetailerService
    ]
})

export class OfferComponent {

    private vListRoute;
    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        this._retailerService.getRetailer(100);
        this._layoutService.setCurrentPage('Offer');
        this._headerService.setTitle('Offer');

    }

    gotoBCPActivityStep() {
        this._pageNavigationService.navigate('BCPActivityStep', null, null);
    }
}