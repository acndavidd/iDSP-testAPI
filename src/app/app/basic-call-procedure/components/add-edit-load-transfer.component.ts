import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'add-edit-load-transfer',
    templateUrl: './app/basic-call-procedure/components/add-edit-load-transfer.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class AddEditLoadTransferComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('AddEditLoadTransfer');
        this._headerService.setTitle('Add / Edit Load Transfer');
    }

    gotoRetailerSalesOrder() {
        this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
    }
}