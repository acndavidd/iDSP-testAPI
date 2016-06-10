import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
        // templateUrl: './app/basic-call-procedure/components/call-preparation.component.html',
        templateUrl: './app/basic-call-procedure/components/hc-call-preparation.component.html',
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
    vLoadWallet;
    vPhysicalInventory;
    vSelectedRetailCallId;
    vCollection;

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
            this.vSelectedRetailCallId = this._pageNavigationService.getCurrentParams().call_id;
        } else {
            console.log('Retailer ID not found');
        }

        console.log('======in detail retailer for retailer id ' +  this.vSelectedRetailId);

        this._retailerService.queryRetailerCallPrep(this.vSelectedRetailId).subscribe(
        response => {
                this.vSelectedRetail = response.json();
                console.log( 'result : ' + this.vSelectedRetail);
           
        },
        error => {
            console.log(error);
        });

        this._retailerService.getLoadWallet(this.vSelectedRetailId).subscribe(
        response => {
                this.vLoadWallet = response.json();
                console.log('HSILLLLLL'+this.vLoadWallet);
        });

        this._retailerService.getPhysicalInventory(this.vSelectedRetailId).subscribe(
        response => {               
                this.vPhysicalInventory = response.json();
        },
        error => {
            console.log(error);
        });
        
        this._retailerService.getCollection('RTL00001').subscribe( // for testing purpose
            response => {
                this.vCollection = response.json();
                console.log('Collection: ' + JSON.stringify(this.vCollection));
            },
            error => {
                console.log(error);
        });

        this._layoutService.setCurrentPage('CallPreparation');
        this._headerService.setTitle('Call Preparation');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    HCgotoCollection() {
        this._pageNavigationService.navigate('BCPCollection', null, null);
    }

    gotoBCPActivityStep(pSelectedRetailer) {
        console.log('all parameters' + pSelectedRetailer);

        let vParamsOld = {
             retailer_id: this.vSelectedRetailId,
             route_sequence: this.vSelectedRetailSeq,
             call_id: this.vSelectedRetailCallId
        };
        let vParams = {
            retailer_id: pSelectedRetailer.retailer_id,
            route_sequence: pSelectedRetailer.seq,
            call_id : pSelectedRetailer.call_id
        };

        this._pageNavigationService.navigate('BCPActivityStep', vParams, vParamsOld);

     }
     
    // gotoBCPActivityStep() {
    //     this._pageNavigationService.navigate('BCPActivityStep', null, null);
    // }

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

    getLoadWallet() {
       return this.vLoadWallet;
    }

    getPhysicalInventory() {
       return this.vPhysicalInventory;
    }

    getCollection() {
        return this.vCollection;
    }

}