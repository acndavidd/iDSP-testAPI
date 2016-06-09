import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {RemittanceService} from '../../remittance/services/remittance.service';

@Component({
    selector: 'collection',
    templateUrl: './app/close-day/components/collection.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CollectionComponent {

    vCollectionShow = false;

    constructor(
        private _router: Router,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _modalService: Modal.ModalService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService,
        private _remittanceService: RemittanceService
    ) {
        this._layoutService.setCurrentPage('Collection');
        this._headerService.setTitle('Collection & Remittance');

        /* getter from backend */
        this._remittanceService.setDSPID('DSP00001'); // for testing purpose
        this._remittanceService.queryGetRemittance();
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoDetailSalesOrder() {
        this._pageNavigationService.navigate('DetailSalesOrder', null, null);
    }
    subCollectionShow() {
        this.vCollectionShow = !this.vCollectionShow;
    }
    gotoDetailCollection() {
        this._pageNavigationService.navigate('DetailCollection', null, null);
    }

    gotoDetailRemittance() {
        this._pageNavigationService.navigate('DetailRemittance', null, null);
    }

    getTotalRemittance() {
        return this._remittanceService.getTotalRemittance();
    }

}