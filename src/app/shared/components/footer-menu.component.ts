import {Component} from 'angular2/core';
import { Router } from 'angular2/router';
import {LayoutService} from '../services/layout.service';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {PageNavigationService} from '../../shared/services/page-navigation.service';
declare var ga:any;

@Component({
    selector: 'idsp-footer-menu',
    templateUrl: 'app/shared/components/footer-menu.component.html'
})

export class FooterMenuComponent{
	constructor (private _matchMediaService: MatchMediaService,
            private _router: Router,
            private _layoutService: LayoutService,
            private _pageNavigationService: PageNavigationService) {
	}

	getLayout(){
		return this._layoutService.getLayout();
	}
	
	gotoStartDay()
	{
		console.log("Start Day");
		this._router.navigate(['StartDay']);
	}
		gotoBasicCallProcedure()
	{
		console.log("Basic");
		this._router.navigate(['BasicCallProcedure']);
	}

	gotoCloseDay()
	{
		console.log("Close Day");
		this._router.navigate(['CloseDay']);
	}

	gotoSettings()
	{
		console.log("Settings");
		this._router.navigate(['Settings']);
	}
}
