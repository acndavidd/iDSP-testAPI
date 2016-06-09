import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {RetailerSalesOrderService} from '../services/retailer-sales-order-service';
import {AddEditLoadTransferComponent} from './add-edit-load-transfer.component';
import {Modal} from '../../shared/services/modal.service';

@Component({
    selector: 'retailer-sales-order',
    templateUrl: './app/basic-call-procedure/components/retailer-sales-order.component.html',
    // templateUrl: './app/basic-call-procedure/components/hc-retailer-sales-order.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers: [RetailerSalesOrderService]
})

export class RetailerSalesOrderComponent {
    vTotalAmount: number = 0;
    vPromoAmount: number = 0;
    vPriceBeforeDisc: number = 0;
    vPhysicalOrder: number = 0;
    vRetailerId: any;
    vRetailerName: any;
    vRetailerMIN: any;
    vDspId: any;
    vDspMin: any;
    vDspName: any;
    vParamList: any = [];
    vDspProfile: any = [];
    vRetailerProfile: any = [];
    vBalanceAfter:any = 0;
    
    vTotalDiscAmount: number = 0;
    vSmartLoadTransferList: any = [];

    // variable of add-edit-load-transfer page
    vAllLoadDataList: any = [];
    vTotalLoadAmount: number;
    vTotalLoadDiscAmount: number;
    vTotalLoadTransferAmount: number;
    vLoadPromoCode;
    vLoadBrand;
    vLoadMIN;
    vLoadBalance: number;
    vLoadRRN;
    vLoadRemarks;

    // variable of add-edit-physical-order page
    vAllPhysicalDataList: any = [];
    vTotalPhysicalAmount;


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService,
        private _retailerSalesOrderService: RetailerSalesOrderService
        ) {

        // initialize data profile
        this.vParamList = this._pageNavigationService.getLatestPreviousData();
        // this.vRetailerProfile = this.vParamList[0].retailer_profile;
        // this.vDspProfile = this.vParamList[1].account_profile;

        // initialize data from add-edit-load-transfer page
        this.vAllLoadDataList = this._pageNavigationService.getCurrentParams();
        this.vRetailerName = this.vAllLoadDataList.retailer_name;
        this.vRetailerId = this.vAllLoadDataList.retailer_id;
        this.vRetailerMIN = this.vAllLoadDataList.retailer_min;
        this.vTotalLoadAmount = parseInt(this.vAllLoadDataList.total_load_amount);
        this.vTotalLoadDiscAmount = parseInt(this.vAllLoadDataList.total_load_disc_amount);
        this.vTotalLoadTransferAmount = parseInt(this.vAllLoadDataList.load_transfer_amount);
        this.vLoadPromoCode = this.vAllLoadDataList.promo_code;
        this.vLoadBrand = this.vAllLoadDataList.brand;
        this.vLoadMIN = this.vAllLoadDataList.selected_min;
        this.vLoadBalance = parseInt(this.vAllLoadDataList.balance);
        this.vLoadRRN = this.vAllLoadDataList.rrn;
        this.vLoadRemarks = this.vAllLoadDataList.remarks;

        this.vBalanceAfter = (this.vLoadBalance - this.vTotalLoadTransferAmount);

        // initialize param page
        this._layoutService.setCurrentPage('RetailerSalesOrder');
        this._headerService.setTitle('Retailer Sales Order');
        this.vPriceBeforeDisc = (this.vTotalLoadTransferAmount + this.vPhysicalOrder);
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
            Modal.ModalType.INFO, {footNote : '*Please check dispute amount in load inventory'});
    }


    skipSalesOrderCallback() {
        this._pageNavigationService.navigate('SkipSalesOrder', this._pageNavigationService.getCurrentParams(), this.vAllLoadDataList);
    }

    gotoAddEditLoadTransfer() {
        this._pageNavigationService.navigate('AddEditLoadTransfer', this._pageNavigationService.getCurrentParams(), this.vAllLoadDataList);
    }

    gotoAddEditPhysicalOrder() {
        this._pageNavigationService.navigate('AddEditPhysicalOrder', this._pageNavigationService.getCurrentParams(), this.vAllLoadDataList);
    }

    priceAfterDiscount() {
        if (!this.vPromoAmount) {
            this.vTotalAmount = this.vPriceBeforeDisc;
        } else {
            this.vTotalAmount = (this.vPriceBeforeDisc - this.vPromoAmount);
        }
        var q = this.vTotalAmount;
        return q.toString().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}