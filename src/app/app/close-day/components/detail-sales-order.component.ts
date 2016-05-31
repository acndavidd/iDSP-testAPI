import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';

@Component({
    selector: 'detail-sales-order',
    templateUrl: './app/close-day/components/detail-sales-order.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class DetailSalesOrderComponent {

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _modalService: Modal.ModalService,
    private _headerService: HeaderService
    ) {

        this._layoutService.setCurrentPage('DetailSalesOrder');
        this._headerService.setTitle('Detail Sales Order');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

}