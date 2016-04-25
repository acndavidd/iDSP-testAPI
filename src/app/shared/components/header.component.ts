import {Component, OnInit} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
declare var ga:any;

@Component({
    selector: 'idsp-header',
    templateUrl: 'app/shared/components/header.component.html'
})

export class HeaderComponent implements OnInit {
	constructor (
		private _layoutService : LayoutService, 
        private _router: Router,
		private _matchMediaService: MatchMediaService,
		private _pageNavigationService: PageNavigationService) {
	}

	title :string;

	ngOnInit() 
	{
		this.title;
	}
}