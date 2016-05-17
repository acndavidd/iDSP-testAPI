import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, RouterOutlet } from 'angular2/router';
import {MatchMediaService} from '../../shared/services/match-media.service';
import {LayoutService} from '../../shared/services/layout.service';
import {HeaderService} from '../../shared/services/header.service';
import {TargetsActualsService} from '../../my-transaction/services/targets-actuals.service';
import {NgModel} from 'angular2/common';
import { Pipe, PipeTransform } from 'angular2/core';


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
    private vListProd;
    private vListProdSubCat;
    private vShowProd;
    private vShowProdSubCat;
    public vSelectedBrand;
    public vSelectedProd;

    private vShowProductFirst;

    private vListProduct;
    private vListCategory;
    private vShowProduct;

    private vSubCatID;
    private vListTargets;
    private vShowTargets;



	constructor (
        private _router: Router,
		private _layoutService: LayoutService,
    	private _matchMediaService: MatchMediaService,
		private _headerService: HeaderService,
        private _targetsActualsService: TargetsActualsService
    	) 
	{
        this.vSelectedBrand = "SMART";

		this._layoutService.setCurrentPage('TargetsActuals');
		this._headerService.setTitle("Targets & Actuals");
        this._targetsActualsService.queryBrand().subscribe(
             response => {
                if(response.json().status == "Success"){
                    this.vListBrands = response.json().brandList;
                }
            },
            error => {}
        );

        this._targetsActualsService.queryProdCat().subscribe(
             response => {
                if(response.json().status == "Success"){
                    this.vListProd = response.json().CatList;
                    this.vShowProd = this.vListProd;
                }
            },
            error => {}
        );


        this._targetsActualsService.queryProduct().subscribe(
             response => {
                if(response.json().status == "Success"){
                    this.vListProduct= response.json().ProdList;
                    this.vShowProduct = this.vListProduct.filter(
                        prod => {
                            return prod.brand == this.vSelectedBrand 
                        });
                }
            },
            error => {}
        );

    }

    getBrand(){
        return this.vListBrands;
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

    onChangeSelectBrand(pSelectedBrand)
    {
        this.vSelectedBrand = pSelectedBrand;
        console.log(this.vSelectedBrand + " IS SELECTED");
        this.vShowProd = this.vListProd.filter(prod => prod.brand == this.vSelectedBrand);
        this.vShowProduct = this.vListProduct.filter(prod => prod.brand == this.vSelectedBrand);
     }   

    getProdCat()
    {  
        return this.vShowProd;
    }

    getProduct()
    {
        return this.vShowProduct;
    }

}