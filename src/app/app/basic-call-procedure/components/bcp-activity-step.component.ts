import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'bcp-activity-step',
    templateUrl: './app/basic-call-procedure/components/bcp-activity-step.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BCPActivityStepComponent {
    vCurrentPointer: string;
    vCollectionFlag = false;
    vOffersFlag = false;
    vSalesFlag = false;
    vFinishButton = false;
    vSelectedRetailId;
    vSelectedRetailSeq;
    vSelectedRetail;
    vSelectedRetailCallId;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _retailerService: RetailerService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {

        console.log(this._pageNavigationService.getCurrentParams());

        if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
            this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
            this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
            this.vSelectedRetailCallId = this._pageNavigationService.getCurrentParams().call_id;
        } else {
            console.log('Retailer ID not found');
        }
        console.log('in BCP activity for retailer id ' +  this.vSelectedRetailId);

        this._retailerService.queryRetailerCallPrep(this.vSelectedRetailId).subscribe(
        response => {
            if (response.json().status === 'Success') {
                console.log('Query Success' + JSON.stringify(response.json().result));
                this.vSelectedRetail = response.json().result;
                console.log( 'result : ' + this.vSelectedRetail );

            } else {
                console.log( 'Query Failed' );
                this.vSelectedRetail = null;
            }
        },
        error => {
            console.log(error);
        });

        this._layoutService.setCurrentPage('BCPActivityStep');
        this._headerService.setTitle('BCP Activities Step');
        this.vCurrentPointer = this._layoutService.getCurrentPointer();
        this.changeColor();
    }

    gotoAnotherPage(pSelectedRetailer,pCallId) {
        console.log('current pointer : ' + this.vCurrentPointer);

         console.log('Go to Call Preparation' + pSelectedRetailer + pCallId );

        let vParamsOld = {
             retailer_id: this.vSelectedRetailId,
            route_sequence: this.vSelectedRetailSeq,
            call_id: this.vSelectedRetailCallId
        };
        let vParams = {
            retailer_id: pSelectedRetailer.retailer_id,
            route_sequence: pSelectedRetailer.seq,
            call_id: pSelectedRetailer.call_id,
            status: pSelectedRetailer.call_status
        };

        if (this.vCurrentPointer === '1') {
        //  this._pageNavigationService.navigate('BCPCollection', null, null);
            this._pageNavigationService.navigate('BCPCollection', vParams, vParamsOld);
        }
        else if (this.vCurrentPointer === '2') {
           // this._pageNavigationService.navigate('Offer', null, null);
           this._pageNavigationService.navigate('Offer', vParams, vParamsOld);

        }
        else if (this.vCurrentPointer === '3') {
           // this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
            this._pageNavigationService.navigate('RetailerSalesOrder', vParams, vParamsOld);
        }
        else if (this.vCurrentPointer === '6') {
           // this._pageNavigationService.navigate('BasicCallProcedure', null, null);
            this._pageNavigationService.navigate('BasicCallProcedure', vParams, vParamsOld);
        }
    }

    changeColor() {
        if (this.vCurrentPointer === '2') {
            this.vCollectionFlag = true;
            this.vOffersFlag = false;
            this.vSalesFlag = false;
        }
        else if (this.vCurrentPointer === '3') {
            this.vCollectionFlag = true;
            this.vOffersFlag = true;
            this.vSalesFlag = false;
        }
        else if (this.vCurrentPointer === '4') {
            this.vCollectionFlag = true;
            this.vOffersFlag = true;
            this.vSalesFlag = true;
        }
        else if (this.vCurrentPointer === '6') {
            this.vCollectionFlag = true;
            this.vOffersFlag = true;
            this.vSalesFlag = true;
            this.vFinishButton = true;
        }
        console.log('current pointer : ' + this.vCurrentPointer + ' | vFinishButton : ' + this.vFinishButton);
    }

    getRetailerDetails() {
        return this.vSelectedRetail;
    }


}