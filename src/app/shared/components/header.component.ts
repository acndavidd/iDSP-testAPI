import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
declare var ga:any;

@Component({
    selector: 'idsp-header',
    templateUrl: 'app/shared/components/header.component.html'
})

export class HeaderComponent{
	constructor (private _matchMediaService: MatchMediaService,
            private _router: Router,
            private _layoutService: LayoutService,
            private _pageNavigationService: PageNavigationService) {
	}

	getLayout(){
		return this._layoutService.getLayout();
	}
}