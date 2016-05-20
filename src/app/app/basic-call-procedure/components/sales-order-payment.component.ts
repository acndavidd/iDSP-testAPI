import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'sales-order-payment',
    templateUrl: './app/basic-call-procedure/components/sales-order-payment.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class SalesOrderPaymentComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('SalesOrderPayment');
        this._headerService.setTitle('Sales Order Payment');
    }

    gotoUnservedOrder() {
        this._pageNavigationService.navigate('UnservedOrder', null, null);
    }
}