import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {RetailerSalesOrderService} from '../services/retailer-sales-order-service';

@Component({
    selector: 'add-edit-load-transfer',
    // templateUrl: './app/basic-call-procedure/components/hc-add-edit-load-transfer.component.html',
    templateUrl: './app/basic-call-procedure/components/add-edit-load-transfer.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ],
    providers: [RetailerSalesOrderService]
})

export class AddEditLoadTransferComponent {

    vDetailPromo = false;
    vArrowMap   = false;
    vRetailerName;
    vRetailerMIN;
    vRetailerID;
    vSelectedBrand;
    vSelectedMIN;
    vInputLoadAmount: number = 0;
    vSuggestedOrder;
    vInputPromoCode;
    vInputDiscountAmount: number = 0;
    vTotalAmount: number = 0;
    vDataList: any = [];
    vRetailerMinList: any = [];

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService,
        private _retailerSalesOrderService: RetailerSalesOrderService
        ) {
        
        this._layoutService.setCurrentPage('AddEditLoadTransfer');
        this._headerService.setTitle('Add Load Transfer');

        // initialize data
        console.log('Start initializing data');
        this.vSelectedBrand = 'smart';
        this.vRetailerName = this._pageNavigationService.getCurrentParams().retailer_name;
        this.vRetailerMIN = this._pageNavigationService.getCurrentParams().retailer_min;
        this.vRetailerID = this._pageNavigationService.getCurrentParams().retailer_id;
        
        try {
            this._retailerSalesOrderService.getSuggestedOrder(this.vRetailerID).subscribe(
                response => {
                    // console.log('get suggested order ' + JSON.stringify(response.json()));
                    this.vSuggestedOrder = response.json().result.suggested_order.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
        } catch (pErr) {
            this.vSuggestedOrder = 'N/A';
        }

        try {
            this._retailerSalesOrderService.getRetailerMins(this.vRetailerID).subscribe(
                response => {
                    this.vRetailerMinList = response.json();
                    this.vSelectedMIN = this.vRetailerMinList[0].retailerMIN;
                },
                error => {
                    throw ('Error in Service');
                });
        } catch (pErr) {
            this._modalService.toggleModal(pErr, Modal.ModalType.ERROR);
        }
    }

    addLoadTransfer() {
        console.log('Go to Retailer Sales Order');
        this._modalService.showConfirmationModal('Confirm Load Transfer to <br/><label class="vivid-pink">'+ this.vSelectedMIN +'</label> with <br/> Total Amount <label class="vivid-pink">P ' + this.vTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</label> and <br/>Total Discount <label class="vivid-pink">P ' + this.vInputDiscountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</label>',
            this.gotoRetailerSalesOrder.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    gotoRetailerSalesOrder() {
        let vParams = {
            retailer_name : this.vRetailerName,
            retailer_id : this.vRetailerID,
            retailer_min : this.vRetailerMIN,
            total_load_amount : this.vTotalAmount,
            total_load_disc_amount : this.vInputDiscountAmount,
            load_transfer_amount : this.vInputLoadAmount,
            load_promo_code : this.vInputPromoCode
        };

        this._pageNavigationService.navigate('RetailerSalesOrder', vParams, null);
    }

    detailPromo() {
        this.vDetailPromo = !this.vDetailPromo;
        this.vArrowMap = !this.vArrowMap;
    }

    setInputLoadAmount(pStr) {
        if(!this.vInputLoadAmount)
            this.vInputLoadAmount = 0;
        this.vInputLoadAmount = parseInt(pStr);
        this.getTotalAmount();
    }

    setSelectedMIN(pStr) {
        this.vSelectedMIN = pStr;
    }

    setInputPromoCode(pStr) {
        this.vInputPromoCode = pStr;
    }

    setInputDiscount(pStr) {
        if(!this.vInputLoadAmount)
            this.vInputLoadAmount = 0;
        this.vInputDiscountAmount = parseInt(pStr);
        this.getTotalAmount();
    }

    setSelectedBrand(pStr) {
        this.vSelectedBrand = pStr;
    }

    getTotalAmount() {
        this.vTotalAmount = (this.vInputLoadAmount-this.vInputDiscountAmount);
    }
}