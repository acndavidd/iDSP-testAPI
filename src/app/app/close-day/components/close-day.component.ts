import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    templateUrl: './app/close-day/components/close-day.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

export class CloseDayComponent {
	

	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {

		this._layoutService.setCurrentPage('CloseDay');
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

}