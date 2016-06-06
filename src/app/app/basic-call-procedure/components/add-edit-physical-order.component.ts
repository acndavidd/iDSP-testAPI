import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'add-edit-physical-order',
    templateUrl: './app/basic-call-procedure/components/add-edit-physical-order.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class AddEditPhysicalOrderComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('AddEditPhysicalOrder');
        this._headerService.setTitle('Add Physical Order');
    }

    addLoadTransfer() {
        console.log('Go to Retailer Sales Order');
        this._modalService.showConfirmationModal('Confirm Physical Order with<br/>Total Amount <label class="vivid-pink">P 1,000</label>and<br/>Total Discount <label class="vivid-pink">P 100</label>',
            this.gotoRetailerSalesOrder.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    gotoRetailerSalesOrder() {
        this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
    }

    gotoAddSalesOrderPhysical() {
        this._pageNavigationService.navigate('AddSalesOrderPhysical', null, null);
    }
}