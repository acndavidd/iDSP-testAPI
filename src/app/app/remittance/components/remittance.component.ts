import {HeaderService} from '../../shared/services/header.service';
import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {NgModel} from 'angular2/common';
import {Response, RequestOptionsArgs, Headers, Http, Connection, RequestOptions} from 'angular2/http';



@Component({
    templateUrl: './app/remittance/components/remittance.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ]
})

export class RemittanceComponent {

    constructor (
    private _router: Router,
    private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
    private _headerService: HeaderService,
    private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('Remittance');
        this._headerService.setTitle('Remittance');
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    gotoConfirm() {
        this._pageNavigationService.navigate('ConfirmRemittance', null, null);
    }

    gotoAdd() {
        this._pageNavigationService.navigate('AddRemittance', null, null);        
    }
}