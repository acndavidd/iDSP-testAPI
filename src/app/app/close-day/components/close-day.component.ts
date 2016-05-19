import {HeaderService} from '../../shared/services/header.service';
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';



@Component({
    templateUrl: './app/close-day/components/close-day.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CloseDayComponent {

    private vDate: Date;

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _modalService: ModalService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('CloseDay');
        this._headerService.setTitle('Close of The Day');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    toggleCollection() {
        // this._router.navigate(['Collection']);
        this._pageNavigationService.navigate('Collection', null, null);
    }

    goToTargetsActuals() {
        console.log('TA');
        // this._router.navigate(['CDTargetsActuals']);
        this._pageNavigationService.navigate('TargetsActuals', null, null);
    }

    goToVisitedRetailer() {
        console.log('VR');
        // this._router.navigate(['VisitedRetail']);
        this._pageNavigationService.navigate('VisitedRetail', null, null);
    }

    goToCollection() {
        console.log('C');
         // this._router.navigate(['Collection']);
        this._pageNavigationService.navigate('Collection', null, null);
    }

    goToStockReturn() {
        console.log('SR');
        this._pageNavigationService.navigate('StockReturn', null, null);
    }

    getToday() {
        return this.vDate;
    }
}