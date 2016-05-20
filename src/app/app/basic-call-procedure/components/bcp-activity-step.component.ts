import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    selector: 'bcp-activity-step',
    templateUrl: './app/basic-call-procedure/components/bcp-activity-step.html',
    directives: [
        NgModel,
        ROUTER_DIRECTIVES
    ]
})

export class BCPActivityStepComponent {


    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService,
        private _router: Router
        ) {
        this._layoutService.setCurrentPage('BCPActivityStep');
        this._headerService.setTitle('BCP Activities Step');
    }

    gotoBCPCollection() {
        console.log('Go to Collection');
        this._pageNavigationService.navigate('BCPCollection', null, null);
    }

}