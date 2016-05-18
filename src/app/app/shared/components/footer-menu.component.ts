import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {Layout} from '../../../models/layout';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';

@Component({
    selector: 'idsp-footer-menu',
    templateUrl: 'app/shared/components/footer-menu.component.html'
})

export class FooterMenuComponent {
    constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _pageNavigationService: PageNavigationService) {
    }

    goToMyTransaction() {
        console.log('My Transaction');
        this._router.navigate(['MainPage', 'MyTransaction']);
    }

    goToBasicCallProcedure() {
        console.log('Basic');
        this._router.navigate(['MainPage', 'BasicCallProcedure']);
    }

    goToCloseDay() {
        console.log('Close Day');
        this._router.navigate(['MainPage', 'CloseDay']);
    }

    goToSettings() {
        console.log('Settings');
        this._router.navigate(['MainPage', 'Settings']);
    }

    // getFooterItem() {
    //  console.log('Footer item');
    //  return this._layoutService.getFooterItem();
    // }

    // getFooterState() {
    //  return this._layoutService.getFooterState();
    // }

    getLayout() {
        return this._layoutService.getLayout();
    }
}
