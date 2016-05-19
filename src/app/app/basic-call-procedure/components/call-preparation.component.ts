import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, RouteParams } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';

@Component({
    templateUrl: './app/basic-call-procedure/components/call-preparation.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class CallPreparationComponent {

    vProfileMenuShow = false;
    vCollectionMenuShow = false;
    vLoadMenuShow = false;
    vPhysicalMenuShow = false;

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _pageNavigationService: PageNavigationService
        ) {
        this._layoutService.setCurrentPage('CallPreparation');
        this._headerService.setTitle('Call Preparation');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoBCPActivityStep() {
        this._pageNavigationService.navigate('BCPActivityStep', null, null);
    }

    subProfileMenuShow() {
        this.vProfileMenuShow = !this.vProfileMenuShow;
    }

    subCollectionMenuShow() {
        this.vCollectionMenuShow = !this.vCollectionMenuShow;
    }

    subLoadMenuShow() {
        this.vLoadMenuShow = !this.vLoadMenuShow;
    }

    subPhysicalMenuShow() {
        this.vPhysicalMenuShow = !this.vPhysicalMenuShow;
    }
}