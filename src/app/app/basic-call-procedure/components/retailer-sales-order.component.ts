import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {RetailerSalesOrderService} from '../services/retailer-sales-order-service';
import {Modal} from '../../shared/services/modal.service';

@Component({
    selector: 'retailer-sales-order',
    // ptemplateUrl: './app/basic-call-procedure/components/retailer-sales-order.component.html',
    templateUrl: './app/basic-call-procedure/components/hc-retailer-sales-order.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers: [
        RetailerSalesOrderService
    ]
})

export class RetailerSalesOrderComponent {
    vTotalAmount: number = 0;
    vPromoAmount: number = 0;
    vSubTotal: number = 0;
    vTransferLoad: number = 0;
    vPhysicalOrder: number = 0;
    vSelectedRetailId: any;
    vSelectedRetailName: any;
    vSelectedRetailMIN: any;
    vAllDataList: any = [];
    vTransferLoadList: any = [];

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService,
        private _retailerSalesOrderService: RetailerSalesOrderService
        ) {

        // if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
        //     this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
        //     this.vSelectedRetailName = this._pageNavigationService.getCurrentParams().retailer_name;
        // } else{
            
        // }
        this.vAllDataList = this._retailerSalesOrderService.getAllDataList();
        console.log('isi data : ' + JSON.stringify(this.vAllDataList));
        this.vSelectedRetailId = this.vAllDataList[0].retailer_id;
        console.log('isi retailer id : ' + this.vAllDataList[0].retailer_id);
        this.vSelectedRetailName = this.vAllDataList[0].retailer_name;
        this.vSelectedRetailMIN = this.vAllDataList[0].retailer_min;

        this._layoutService.setCurrentPage('RetailerSalesOrder');
        this._headerService.setTitle('Retailer Sales Order');
        this.vSubTotal = (this.vTransferLoad + this.vPhysicalOrder);
    }

    goToSalesOrderPayment() {
        console.log('Go to Sales Order Payment');
        this._router.navigate(['SalesOrderPayment']);
    }

    paySalesOrder() {
        console.log('Conduct Sales Order Payment');
        this._modalService.showConfirmationModal('Are you sure you want to <br/>confirm the sales order with<br/>payment amount<br/><label class="vivid-pink">P 5,700</label>?',
            this.goToSalesOrderPayment.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    skipSalesOrder() {
        console.log('Skip Sales Order');
        this._modalService.showConfirmationModal('Are you sure you <br/> want to skip retailer sales order ?',
            this.skipSalesOrderCallback.bind(this),
            '* If you confirm to continue, <br/> You cannot go back to retailer sales order <br/> for this retailer', Modal.ButtonType.OK_CANCEL);
    }

    confirmDisputeLoadTransfer() {
        console.log('Confirm Dispute Load Transfer');
        this._modalService.showConfirmationModal('Are you sure you want to <br/> open dispute this transaction?',
            this.disputeLoadTransfer.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    disputeLoadTransfer() {
        console.log('Save Dispute Amount');
        this._modalService.toggleModal('Dispute with <br/>Amount <label class="vivid-pink">P 2,000</label> is recorded',
            Modal.ModalType.INFO, {footNote : '*Please check dispute amount in load inventory'})
    }


    skipSalesOrderCallback() {
        this._pageNavigationService.navigate('SkipSalesOrder', null, null);
    }

    gotoAddEditLoadTransfer() {
        this._pageNavigationService.navigate('AddEditLoadTransfer', null, null);
    }

    gotoAddEditPhysicalOrder() {
        this._pageNavigationService.navigate('AddEditPhysicalOrder', null, null);
    }

    getTransferLoadList() {
        console.log('lalallaa');
        return this.vAllDataList;
    }

    getTotalAmount() {
        if (!this.vPromoAmount) {
            this.vTotalAmount = this.vSubTotal;
        } else {
            this.vTotalAmount = (this.vSubTotal - this.vPromoAmount);
        }
        var q = this.vTotalAmount;
        return q.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    }
}