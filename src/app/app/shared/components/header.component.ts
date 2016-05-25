import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
import {HeaderService} from '../../shared/services/header.service';
import {Layout} from '../../../models/layout';

@Component({
    selector: 'idsp-header',
    templateUrl: 'app/shared/components/header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor (
        private _layoutService: LayoutService,
        private _router: Router,
        private _matchMediaService: MatchMediaService,
        private _pageNavigationService: PageNavigationService,
        private _headerService: HeaderService) {}

    vTitle: string;

    ngOnInit() {

    }

    toggleLeftMenu() {
        this._layoutService.toggleLeftMenu();
    }

    getTitle() {
        return this._headerService.getTitle();
    }

    getLayout() {
        return this._layoutService.getLayout();
    }

    getHeaderLayout() {
        return this._layoutService.getHeaderLayout();
    }

    goToPreviousPage() {
        this._pageNavigationService.gotoPreviousPage();
    }

    toggleSearch() {
        this._layoutService.setSearch();
    }

    toggleFilter() {
        this._layoutService.setFilter();
    }

    toggleAdd() {
        this._layoutService.toggleAdd();
    }
}