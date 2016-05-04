import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'retailer-sales-order',
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
		private _router: Router
		) 
	{
		this._layoutService.setCurrentPage('SalesOrderPayment');
		this._headerService.setTitle("Sales Order Payment");
    }

}