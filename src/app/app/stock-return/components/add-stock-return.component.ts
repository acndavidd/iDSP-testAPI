import {Component, Input, Provider} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet, ROUTER_PROVIDERS } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {NgFor, NgModel} from 'angular2/common';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'add-stock-return',
    templateUrl: './app/stock-return/components/add-stock-return.component.html',
    directives: [
        NgFor, NgModel, ROUTER_DIRECTIVES
    ],
})

export class AddStockReturnComponent {

    constructor (
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _router: Router,
        private _pageNavigationService: PageNavigationService
    ) {
        this._layoutService.setCurrentPage('AddStockReturn');
        this._headerService.setTitle('Add Stock Return');
    }

    save(pEvent) {
        pEvent.preventDefault();

        // For By Pass Directly without API
        console.log('stock return is successfully added');
    }

    goToConfirmStockReturn() {
        this._pageNavigationService.navigate('ConfirmStockReturn', null, null);
    }
}
