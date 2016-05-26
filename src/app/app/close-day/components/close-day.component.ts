import {HeaderService} from '../../shared/services/header.service';
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
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
    private _modalService: Modal.ModalService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('CloseDay');
        this._headerService.setTitle('Close of The Day');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    goToTargetsActuals() {
        this._pageNavigationService.navigate('TargetsActuals', null, null);
    }

    goToVisitedRetailer() {
        this._pageNavigationService.navigate('VisitedRetail', null, null);
    }

    goToCollection() {
        this._pageNavigationService.navigate('Collection', null, null);
    }

    goToUnservedOrder() {
        this._pageNavigationService.navigate('CDUnservedOrder', null, null);
    }

    getToday() {
        return this.vDate;
    }
}