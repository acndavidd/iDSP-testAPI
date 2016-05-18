import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {ModalService} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';

@Component({
    selector: 'cd-targets-actuals',
    templateUrl: './app/close-day/components/cd-targets-actuals.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CDTargetsActualsComponent {

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _modalService: ModalService,
    private _headerService: HeaderService
    ) {

        this._layoutService.setCurrentPage('CDTargetsActuals');
        this._headerService.setTitle('Targets & Actuals');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }
}