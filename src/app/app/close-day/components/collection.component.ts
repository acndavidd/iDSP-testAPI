import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'collection',
    templateUrl: './app/close-day/components/collection.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CollectionComponent {

    vCollectionShow = false;

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _modalService: Modal.ModalService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('Collection');
        this._headerService.setTitle('Collection & Remittance');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoSalesOrderDetail() {
        this._pageNavigationService.navigate('SalesOrderDetail', null, null);
    }
    subCollectionShow() {
        this.vCollectionShow = !this.vCollectionShow;
    }
    gotoTotalCollectionShow() {
        this._pageNavigationService.navigate('TotalCollectionDetail', null, null);
    }
    gotoTotalRemittanceShow() {
        console.log('test to remittance oiii');
        this._pageNavigationService.navigate('TotalRemittanceDetail', null, null);
    }

}