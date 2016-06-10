import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {RetailerService} from '../../shared/services/retailer.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
      
      // templateUrl: './app/basic-call-procedure/components/hc-call-preparation.component.html',
        templateUrl: './app/basic-call-procedure/components/call-preparation.component.html',
        // templateUrl: './app/basic-call-procedure/components/hc-call-preparation.component.html',

    directives: [
      NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class CallPreparationComponent {

    private vProfileMenuShow = false;
    private vCollectionMenuShow = false;
    private vLoadMenuShow = false;
    private vPhysicalMenuShow = false;
    private vSelectedRetailId;
    private vSelectedRetailSeq;
    private vSelectedRetail;
    private vSelectedRetailFirstChar;
    private vStartEnabled = false;
    private vLoadWallet;
    private vPhysicalInventory;
    private vSelectedRetailCallId;
    private vCollection;
    private vLastAmountTransferred;
    private vFirstCharacter;
    private vSmartLoadLT;
    private vXpressLoadLT;
    private vSmartLoadWallet;
    private vXpressLoadLWallet;
    private vOutstandingBalance;
    private vXpressLoadLAT: any = [];
    private vSmartLoadLAT;

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

        console.log('CALL PREPARATION FOR RETAILER : ' +  this.vSelectedRetailId);

        this._retailerService.queryRetailerCallPrep(this.vSelectedRetailId).subscribe(
        response => {
                this.vSelectedRetail = response.json(); 
                this.vFirstCharacter = JSON.stringify(this.vSelectedRetail[0].storeName).substring(2,1); 
                console.log('RETAILER PROFILE' +this.vFirstCharacter); 
        },
        error => {
            console.log(error);
        });

        this._retailerService.getLoadWallet(this.vSelectedRetailId).subscribe(
        response => {
                this.vLoadWallet = response.json();
                  console.log('LOAD WALLET' + JSON.stringify(this.vLoadWallet));
                this.vSmartLoadWallet =  this.vLoadWallet.filter(retailer => {
                   return retailer.brand === 'Smart';
                });
                console.log('this.vSmartLoadWallet : ' + JSON.stringify(this.vSmartLoadWallet));
                this.vXpressLoadLWallet =  this.vLoadWallet.filter(retailer => {
                  return retailer.brand === 'Sun';
                });
                console.log('this.vXpressLoadLWallet : ' + JSON.stringify(this.vXpressLoadLWallet));
        });

        this._retailerService.getPhysicalInventory(this.vSelectedRetailId).subscribe(
        response => {               
                this.vPhysicalInventory = response.json();
                console.log('PHYSICAL INVENTORY :' + JSON.stringify(this.vPhysicalInventory));
        },
        error => {
            console.log(error);
        });
        
        this._retailerService.getCollection('RTL00001').subscribe( // for testing purpose
            response => {
                this.vCollection = response.json();
                console.log('COLLECTION :' + JSON.stringify(this.vCollection));
        },
        error => {
            console.log(error);
        });

         this._retailerService.getLastAmountTransferred(this.vSelectedRetailId).subscribe(
        response => {               
                this.vLastAmountTransferred = response.json();
                  console.log('LAST AMOUNT TRANSFER : ' + JSON.stringify(this.vLastAmountTransferred));
                this.vXpressLoadLAT = this.vLastAmountTransferred.filter(retailer => {
                 return retailer.productId === 'XPRESSLOAD';
                });
                console.log('this.vXpressLoadLAT : ' + JSON.stringify(this.vXpressLoadLAT));
                 this.vSmartLoadLAT = this.vLastAmountTransferred.filter(retailer => {
                 return retailer.productId === 'SMARTLOAD';
                });
                console.log('this.vSmartLoadLAT : ' + JSON.stringify(this.vSmartLoadLAT));
        },
        error => {
            console.log(error);
        });

        this._retailerService.getOutstandingBalance(this.vSelectedRetailId).subscribe(
        response => {               
                this.vOutstandingBalance = response.json();
                console.log('OUTSTANDING BALANCE : ' + JSON.stringify(this.vOutstandingBalance));
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

    getPhysicalInventory() {
       return this.vPhysicalInventory;
    }

    getCollection() {
        return this.vCollection;
    }

    // getOutstandingBalanceTotal() {
    //     return this.vOutstandingBalance;
    // }

}