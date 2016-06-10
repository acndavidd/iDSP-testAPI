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
    vArrowMap = false;
    vRetailerName: any;
    vRetailerMIN: any;
    vRetailerID: any;
    vSelectedBrand: any;
    vSelectedMIN: any;
    vInputLoadAmount: number = 0;
    vSuggestedOrder: any;
    vInputPromoCode: any;
    vInputDiscountAmount: number;
    vTotalAmount: number = 0;
    vParamList: any = [];
    vRetailerMinList: any = [];
    vRetailerProfile: any = [];
    vDspProfile: any = [];
    vCurrentBalance: any = 0;
    vRRN: any;
    vRemarks: any;

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
        this.vParamList = this._pageNavigationService.getCurrentParams();
        this.vRetailerProfile = this.vParamList[0].retailer_profile;
        this.vDspProfile = this.vParamList[1].account_profile;
        this.vRetailerName = this.vRetailerProfile.retailer_name;
        this.vRetailerMIN = this.vRetailerProfile.retailer_min;
        this.vRetailerID = this.vRetailerProfile.retailer_id;

        console.log('isi dsp profile: ' + JSON.stringify(this.vDspProfile));

        // get list of mins from OPIS+
        try {
            this._retailerSalesOrderService.getRetailerMins(this.vRetailerID).subscribe(
                response => {
                    this.vRetailerMinList = response.json();
                },
                error => {
                    console.log(JSON.stringify(error.json()));
                    throw ('Error in get retailer MINs service');
                });
        } catch (pErr) {
            this._modalService.toggleModal(pErr, Modal.ModalType.ERROR);
        }
   
        // get list of mins from OPIS+
        try {
            this._retailerSalesOrderService.getRetailerMins(this.vRetailerID).subscribe(
                response => {
                    this.vRetailerMinList = response.json();
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
        this._modalService.showConfirmationModal('Confirm Load Transfer to <br/><label class="vivid-pink">'+ this.vSelectedMIN +'</label> with <br/> Total Amount <label class="vivid-pink">P ' + this.vTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</label> and <br/>Total Discount <label class="vivid-pink">P ' + this.vInputDiscountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</label>',
            this.gotoRetailerSalesOrder.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    addLoadTransferHC() {
        console.log('Go to Retailer Sales Order');
        this._modalService.showConfirmationModal('Confirm Load Transfer to <br/><label class="vivid-pink">'+ this.vSelectedMIN +'</label> with <br/> Total Amount <label class="vivid-pink">P ' + this.vTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</label> and <br/>Total Discount <label class="vivid-pink">P ' + this.vInputDiscountAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '</label>',
            this.gotoRetailerSalesOrderHC.bind(this),
            null, Modal.ButtonType.OK_CANCEL);
    }

    gotoRetailerSalesOrder() {
        let vParamsELP = {
            dsp_min : this.vDspProfile.dsp_min_smart,
            retailer_min : this.vSelectedMIN,
            load_transfer_amount : this.vInputLoadAmount,
            source : 'iDSP'
        };

        this._retailerSalesOrderService.newSalesOrder(this.vRetailerID, vParamsELP).subscribe(
            response => {
                console.log('Get RRN Response : ' +response.json());
                this.vRRN = response.json();
                this.vRemarks = 'Success';
                this.go();
            },
            error => {
                console.log('error asdas : ' + JSON.stringify(error));
                if (error.status === 408) 
                    this.vRemarks = 'Load Transfer Timeout';
                else
                    this.vRemarks = 'Failed Load Transfer';
                this.vRRN = '';
                this.go();
        });
    }

    go() {
        if (this.vRemarks) {
            let vParams = {
                retailer_name : this.vRetailerName,
                retailer_id : this.vRetailerID,
                retailer_min : this.vRetailerMIN,
                total_load_amount : this.vTotalAmount,
                total_load_disc_amount : this.vInputDiscountAmount,
                load_transfer_amount : this.vInputLoadAmount,
                load_promo_code : this.vInputPromoCode,
                brand : this.vSelectedBrand,
                selected_min : this.vSelectedMIN,
                balance : this.vCurrentBalance,
                rrn : this.vRRN,
                remarks : this.vRemarks
            };

            this._pageNavigationService.navigate('RetailerSalesOrder', vParams, this.vParamList);
        }
    }

    gotoRetailerSalesOrderHC() {
        this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
    }
    detailPromo() {
        this.vDetailPromo = !this.vDetailPromo;
        this.vArrowMap = !this.vArrowMap;
    }

    setInputLoadAmount(pStr: number) {
        this.vInputLoadAmount = pStr;
    }

    setSelectedMIN(pStr) {
        this.vSelectedMIN = pStr;
        // get retailer balance from ELP
        try {
            let vParams = {
                min : this.vSelectedMIN,
                source : 'iDSP'
            };
            this._retailerSalesOrderService.getRetailerBalanceElp(vParams).subscribe(
                response => {
                    this.vCurrentBalance = response.json().currentBalance;
                    console.log('Get current balance ELP : ' + this.vCurrentBalance);
                },
                error => {
                    console.log('Error respons from ELP : ' + error);
                });
        } catch(pErr) {
            this.vCurrentBalance = 'N/A';
            console.log('Error when getting current balance from ELP : ' +pErr);
        }

        // get suggested order from DB 
        try {
            if (this.vSelectedBrand) {
                let vParamLoad = {
                    id : this.vRetailerID,
                    brand : this.vSelectedBrand,
                    subcat_type : 'L'
                };
                this._retailerSalesOrderService.getSuggestedOrder(vParamLoad).subscribe(
                    response => {
                        if (!response.json())
                            this.vSuggestedOrder = 0;
                        else
                            this.vSuggestedOrder = response.json();
                    },
                    error => {
                        this.vSuggestedOrder = 'N/A';
                        console.log('Cannot get suggested order : ' + error);
                    });
            }
        } catch (pErr) {
            this.vSuggestedOrder = 'N/A';
            console.log('Error when calling suggested order service');
        }
    }

    setSelectedBrand(pStr) {
        this.vSelectedBrand = pStr;
    }

    getTotalAmount() {
        if (!this.vInputDiscountAmount) {
            return '0';
        } else {
            this.vTotalAmount = (this.vInputLoadAmount-this.vInputDiscountAmount);
            return this.vTotalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
}