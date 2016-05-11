import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';

import {ModalService} from '../../shared/services/modal.service';

import {HeaderService} from '../../shared/services/header.service';


@Component({
    templateUrl: './app/close-day/components/close-day.component.html',
	directives: [
		ROUTER_DIRECTIVES
    ]
})

export class CloseDayComponent {


	constructor (
	private _router: Router,
	private _layoutService: LayoutService,
    private _matchMediaService: MatchMediaService,
	private _modalService: ModalService,
	private _headerService: HeaderService
    ){
		this._layoutService.setCurrentPage('CloseDay');
        this._headerService.setTitle("Close Day");
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    toggleCollection(){
        this._router.navigate(['Collection']);
    }

    goToTargetsActuals()
    {
        console.log('TA');
        this._router.navigate(['CDTargetsActuals']);
    }

    goToVisitedRetailer()
    {
        console.log('VR');
    }

    goToCollection()
    {
        console.log('C');
         this._router.navigate(['Collection']);
    }

    goToStockReturn()
    {
        console.log('SR');
    }
}