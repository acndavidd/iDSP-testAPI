import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {Layout} from '../../models/layout';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    templateUrl: './app/start-day/components/start-day.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

export class StartDayComponent {
	title = "START DAY COMPONENT";

	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {

		this._layoutService.setCurrentPage('StartDay');
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

    getLayout(){
		return this._layoutService.getLayout();
	}

}