import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'bcp-activity-step',
    templateUrl: './app/basic-call-procedure/components/bcp-activity-step.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class BCPActivityStepComponent {
    vCurrentPointer: string;
    vCollectionFlag = false;
    vOffersFlag = false;
    vSalesFlag = false;


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        this._layoutService.setCurrentPage('BCPActivityStep');
        this._headerService.setTitle('BCP Activities Step');
        this.vCurrentPointer = this._layoutService.getCurrentPointer();
        this.changeCollectionColor();
        this.changeOffersColor();
        this.changeSalesColor();
    }

    gotoBCPCollection() {
        console.log('Go to Collection');
        if (this.vCurrentPointer === '1') {
          this._pageNavigationService.navigate('BCPCollection', null, null);
        }
        else if (this.vCurrentPointer === '2') {
            this._pageNavigationService.navigate('Offer', null, null);
        }
        else if (this.vCurrentPointer === '3') {
            this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
        }

    }

    changeCollectionColor() {
        if (this.vCurrentPointer === '2') {
            this.vCollectionFlag = true;
            this.vOffersFlag = false;
            this.vSalesFlag = false;
        }
    }

    changeOffersColor() {
        if (this.vCurrentPointer === '3') {
            this.vCollectionFlag = true;
            this.vOffersFlag = true;
            this.vSalesFlag = false;
        }
    }

    changeSalesColor() {
        if (this.vCurrentPointer === '4') {
            this.vCollectionFlag = true;
            this.vOffersFlag = true;
            this.vSalesFlag = true;
        }
    }
}