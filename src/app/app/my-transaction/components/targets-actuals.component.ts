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
    public vSelectedBrand;

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
        // this._targetsActualsService.queryBrand().subscribe(
        //     response => {
        //         if(response.json().status == "Success"){
        //             this.vListBrands = response.json().brandList;
        //             this.vSelectedBrand = this.vListBrands;
        //         }
        //     },
        //     error => {}
        // );

        // console.log("aabb"+ this.vListBrands);

        this.vSelectedBrand = "SMART";
    }

    getBrand(){
        return this._targetsActualsService.vBrand;
        //return this._targetsActualsService.getBrand();
    }

    getBrandSelected(){
        return this._targetsActualsService.vBrand.brand[0];
        //return this._targetsActualsService.getBrand();
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


    }

    showMenuWeek()
    {
    	this.vWeekShow = true;
        this.vUnderlineWeek = true;
        this.vUnderlineDay = false;
   		this.vUnderlineMonth = false;
   		this.vDayShow = false;
		this.vMonthShow = false;
    }

    showMenuMonth()
    {
    	this.vMonthShow = true;
        this.vUnderlineMonth = true;
        this.vUnderlineWeek = false;
    	this.vUnderlineDay = false;
    	this.vWeekShow = false;
		this.vDayShow = false;
    }

    // refreshBrand(){
    //     this.vListBrands = this._targetsActualsService.queryBrand();
    //     //console.log('asdadasdasdada');
    //     //console.log(this.vListBrands );
    // }

    onChangeSelectBrand(pSelectedBrand){
        this.vSelectedBrand = pSelectedBrand;
        console.log(this.vSelectedBrand + " IS SELECTED")
    }   

    getProdCat()
    {
        return this._targetsActualsService.vProdCat;
    }

      
}