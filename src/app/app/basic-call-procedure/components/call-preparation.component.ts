import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
     templateUrl: './app/basic-call-procedure/components/call-preparation.component.html',
    // templateUrl: './app/basic-call-procedure/components/hc-call-preparation.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CallPreparationComponent {

    vProfileMenuShow = false;
    vCollectionMenuShow = false;
    vLoadMenuShow = false;
    vPhysicalMenuShow = false;
    vSelectedRetailId;
    vSelectedRetailSeq;
    vSelectedRetail;
    vSelectedRetailFirstChar;
    vStartEnabled = false;

    constructor (
        private _layoutService: LayoutService,
        private _retailerService: RetailerService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {

        console.log(this._pageNavigationService.getCurrentParams());

        if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
            this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
            this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
        } else {
            console.log('Retailer ID not found');
        }
        console.log('in detail retailer for retailer id ' +  this.vSelectedRetailId);

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

        this.getStartStatus();
        this._layoutService.setCurrentPage('CallPreparation');
        this._headerService.setTitle('Call Preparation');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    HCgotoBCPActivityStep() {
        this._pageNavigationService.navigate('BCPActivityStep', null, null);
    }

    gotoBCPActivityStep(pSelectedRetailer) {
        console.log('all parameters' + pSelectedRetailer);

        let vParamsOld = {
             retailer_id: this.vSelectedRetailId,
             route_sequence: this.vSelectedRetailSeq
        };

        let vParams = {
            retailer_id: pSelectedRetailer.retailer_id,
            route_sequence: this.vSelectedRetailSeq
        };

        this._pageNavigationService.navigate('BCPActivityStep', vParams, vParamsOld);
    }

    getRetailerDetails() {
        return this.vSelectedRetail;
    }

    subProfileMenuShow() {
        this.vProfileMenuShow = !this.vProfileMenuShow;
    }

    subCollectionMenuShow() {
        this.vCollectionMenuShow = !this.vCollectionMenuShow;
    }

    subLoadMenuShow() {
        this.vLoadMenuShow = !this.vLoadMenuShow;
    }

    subPhysicalMenuShow() {
        this.vPhysicalMenuShow = !this.vPhysicalMenuShow;
    }

    getStartStatus() {
        switch (this._pageNavigationService.getCurrentParams()) {
            case 'visited':
                this.vStartEnabled = false;
                break;
            default:
                this.vStartEnabled = true;
                break;
        }
    }
}