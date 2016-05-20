import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    selector: 'unserved-order',
    templateUrl: './app/basic-call-procedure/components/unserved-order.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class UnservedOrderComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: ModalService,
        private _router: Router
        ) {
        this._layoutService.setCurrentPage('UnservedOrder');
        this._headerService.setTitle('Unserved Order');
    }

}