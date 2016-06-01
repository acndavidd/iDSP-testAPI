import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgModel} from 'angular2/common';
import {Modal} from '../../shared/services/modal.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'skip-collection',
    templateUrl: './app/basic-call-procedure/components/skip-collection.component.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class SkipCollectionComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _modalService: Modal.ModalService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('SkipCollection');
        this._headerService.setTitle('Skip Collection');
    }

    submitReasonCollection() {
        this._pageNavigationService.navigate('Offer', null, null);
    }

}