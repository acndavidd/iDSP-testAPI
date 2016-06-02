import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';

@Component({
    selector: 'detail-collection',
    templateUrl: './app/close-day/components/detail-collection.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class DetailCollectionComponent {

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,

    private _matchMediaService: MatchMediaService,
    private _modalService: Modal.ModalService,
    private _headerService: HeaderService
    ) {
        this._layoutService.setCurrentPage('DetailCollection');
        this._headerService.setTitle('Detail Collection');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

}