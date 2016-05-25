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
    // templateUrl: './app/basic-call-procedure/components/retailer-sales-order.component.html',
    templateUrl: './app/basic-call-procedure/components/cd-retailer-sales-order.component.html',
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

    skipSalesOrderModalComponent() {
        console.log('Skip Sales Order');
        // this._modalService.toggleSkipSalesOrderModal();
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

    goToTransferLoadPage() {
        
    }

}