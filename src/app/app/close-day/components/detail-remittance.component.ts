import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';
import {RemittanceService} from '../../remittance/services/remittance.service';

@Component({
    selector: 'detail-remittance',
    templateUrl: './app/close-day/components/detail-remittance.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class DetailRemittanceComponent {

    constructor(
        private _router: Router,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _modalService: Modal.ModalService,
        private _headerService: HeaderService,
        private _remittanceService: RemittanceService
    ) {
        this._layoutService.setCurrentPage('DetailRemittance');
        this._headerService.setTitle('Detail Remittance');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getTotalRemittance() {
        return this._remittanceService.getTotalRemittance();
    }

    getRemittance() {
        return this._remittanceService.getRemittance();
    }

}