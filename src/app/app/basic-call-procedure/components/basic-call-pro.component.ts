import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

@Component({
    templateUrl: './app/basic-call-procedure/components/basic-call-pro.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

export class BasicCallProcedureComponent {
	

	constructor (private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService) {

		this._layoutService.setCurrentPage('BasicCallProcedure');
    }
	
	getResize(){
        return this._matchMediaService.getmm();  
    }

}