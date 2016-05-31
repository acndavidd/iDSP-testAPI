import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {Modal} from '../../shared/services/modal.service';
import {HeaderService} from '../../shared/services/header.service';

@Component({
    selector: 'total-collection-detail',
    templateUrl: './app/close-day/components/total-collection-detail.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class TotalCollectionDetailComponent {

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _modalService: Modal.ModalService,
    private _headerService: HeaderService
    ) {
        this._layoutService.setCurrentPage('TotalCollectionDetail');
        this._headerService.setTitle('Total Collection Detail');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    
}

