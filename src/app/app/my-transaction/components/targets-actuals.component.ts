import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {TargetsActualsService} from '../../my-transaction/services/targets-actuals.service';
import {NgModel} from 'angular2/common';

@Component({
	selector: 'targets-actuals',
    templateUrl: './app/my-transaction/components/targets-actuals.component.html',
	directives: [
		NgModel,
		ROUTER_DIRECTIVES
    ],
    providers: [
        TargetsActualsService
    ]    
})

export class TargetsActualsComponent {
	
	vDayShow = true;
	vWeekShow = false;
	vMonthShow = false;
    vUnderlineDay = true;
    vUnderlineWeek = false;
    vUnderlineMonth = false;
    private vListBrands;
    private vSelectedBrand: String;

	constructor (
        private _router: Router,
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _targetsActualsService: TargetsActualsService
    	) 
	{

		this._layoutService.setCurrentPage('TargetsActuals');
		this._headerService.setTitle("Targets & Actuals");
        //this.vListBrands = this._targetsActualsService.queryBrand();
        //this.refreshBrand();

    }

    getBrand(){
        return this._targetsActualsService.getBrand();
    }
	
	getResize(){
        return this._matchMediaService.getMm();  
    }

    getFilter()
    {
        return this._layoutService.getFilter();
    }

    showMenuDay()
    {
        this.vDayShow = true;
        this.vUnderlineDay = true;
        this.vUnderlineWeek = false;
    	this.vUnderlineMonth = false;
    	this.vWeekShow = false;
		this.vMonthShow = false;
        this.refreshBrand();

    }

    showMenuWeek()
    {
    	this.vWeekShow = true;
        this.vUnderlineWeek = true;
        this.vUnderlineDay = false;
   		this.vUnderlineMonth = false;
   		this.vDayShow = false;
		this.vMonthShow = false;
        this.refreshBrand();
    }

    showMenuMonth()
    {
    	this.vMonthShow = true;
        this.vUnderlineMonth = true;
        this.vUnderlineWeek = false;
    	this.vUnderlineDay = false;
    	this.vWeekShow = false;
		this.vDayShow = false;
        this.refreshBrand();
    }

    refreshBrand(){
        this.vListBrands = this._targetsActualsService.queryBrand();
        //console.log('asdadasdasdada');
        //console.log(this.vListBrands );
    }


      
}