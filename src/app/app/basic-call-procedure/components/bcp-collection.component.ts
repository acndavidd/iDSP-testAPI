import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {Modal} from '../../shared/services/modal.service';
import {NgModel} from 'angular2/common';

@Component({
    // templateUrl: './app/basic-call-procedure/components/bcp-collection.component.html',
    templateUrl: './app/basic-call-procedure/components/hc-bcp-collection.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BCPCollectionComponent {

    vOutstandingShow = false;
    vArrowMap        = false;
    vPaymentShow     = false;
    vSelectedRetailId;
    vSelectedRetailCallId;
    vSelectedRetail;
    vPaymentHistory;
    vSelectedRetailSeq;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _retailerService: RetailerService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router,
        private _modalService: Modal.ModalService
        ) {


        // console.log(this._pageNavigationService.getCurrentParams());

        // if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
        //     this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
        //     this.vSelectedRetailCallId = this._pageNavigationService.getCurrentParams().call_id;
        //     this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
        // } else {
        //     console.log('Retailer ID not found');
        // }
        // console.log('in BCP collection for retailer id ' +  this.vSelectedRetailId +' Call_ID : '+ this.vSelectedRetailCallId);


        // this._retailerService.queryRetailerCallPrep(this.vSelectedRetailId).subscribe(
        // response => {
        //     if (response.json().status === 'Success') {
        //         console.log('Query Success' + JSON.stringify(response.json().result));
        //         this.vSelectedRetail = response.json().result;
        //         console.log( 'result : ' + this.vSelectedRetail );

        //     } else {
        //         console.log( 'Query Failed' );
        //         this.vSelectedRetail = null;
        //     }
        // },
        // error => {
        //     console.log(error);
        // });

        // this._retailerService.getPaymentHistory(this.vSelectedRetailId).subscribe(
        // response => {
        //     if (response.json().status === 'Success') {
        //         console.log('Query Success' + JSON.stringify(response.json().result));
        //         this.vPaymentHistory = response.json().result;
        //         console.log( 'result : ' + this.vPaymentHistory );

        //     } else {
        //         console.log( 'Query Failed' );
        //         this.vPaymentHistory = null;
        //     }
        // },
        // error => {
        //     console.log(error);
        // });

        this._retailerService.getRetailer(100);
        this._layoutService.setCurrentPage('BCPCollection');
        this._headerService.setTitle('Collection');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    outstandingShow() {
        this.vOutstandingShow = !this.vOutstandingShow;
        this.vArrowMap = !this.vArrowMap;
    }

    paymentShow() {
        this.vPaymentShow = !this.vPaymentShow;
        this.vArrowMap = !this.vArrowMap;
    }

    gotoBCPActivityStep(pSelectedRetailer) {

        // console.log('all parameters' + pSelectedRetailer);

        // let vParamsOld = {
        //      retailer_id: this.vSelectedRetailId,
        //      route_sequence: this.vSelectedRetailSeq,
        //      call_id: this.vSelectedRetailCallId
        // };

        // let vParams = {
        //     retailer_id: pSelectedRetailer.retailer_id,
        //     route_sequence: this.vSelectedRetailSeq,
        //     call_id: this.vSelectedRetailCallId
        // };

        // this._pageNavigationService.navigate('BCPActivityStep', vParams, vParamsOld);
        this._pageNavigationService.navigate('BCPActivityStep', null, null);
    }

    getRetailerDetails() {
        return this.vSelectedRetail;
    }

    getAmountReceivables() {
        
    }

    getPaymentHistory() {

        console.log('masuk get payment history');
        return this.vPaymentHistory;
    }

    // gotoSkipCollection() {
        // nanti pegi ke SKIPP COLLECTION UI
    // }

    skipCollection() {

            console.log('Skip Collection');
            let params = {
            _pageNavigationService : this._pageNavigationService
            };

            this._modalService.toggleModal('Are you sure  <br/> you want to skip collection ?', 
            Modal.ModalType.CONFIRMATION, 
            {footNote : '* If you confirm to continue, <br/> You cannot go back to collection for this retailer', 
            ModalButton : Modal.ModalButton.OK_CANCEL, 
            callback : this.skipCollectionback, 
            param : params,
            } );
    }

    skipCollectionback(pParam) {

            pParam._pageNavigationService.navigate('SkipCollection', null, null);

    } 

    gotoConfirmCollection() {
        this._pageNavigationService.navigate('ConfirmCollection', null, null);
    }
}