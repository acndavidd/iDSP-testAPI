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
    // to be uncommented for actual api
    templateUrl: './app/my-transaction/components/targets-actuals.component.html',
    // to be uncommented for hardcoded values
     // templateUrl: './app/my-transaction/components/md-targets-actuals.component.html',
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
    private vListProduct;
    private vShowProduct;
    private vSelectedTab;

    constructor (
        private _router: Router,
        private _layoutService: LayoutService,
        private _matchMediaService: MatchMediaService,
        private _headerService: HeaderService,
        private _targetsActualsService: TargetsActualsService
        ) {
        this.vSelectedBrand = 'SMART';
        this.vSelectedTab = 'Day';
        this._layoutService.setCurrentPage('TargetsActuals');
        this._headerService.setTitle('Targets & Actuals');

        this._targetsActualsService.queryBrand().subscribe(
             response => {
                if (response.json().status === 'Success') {
                    this.vListBrands = response.json().brandList;
                    console.log('brand result' + this.vListBrands);
                }
            },
            error => {}
        );

        this.getTargetsActuals();

    }

    getBrand() {
        return this.vListBrands;
    }

    getResize() {
        return this._matchMediaService.getMm();
    }

    getFilter() {
        return this._layoutService.getFilter();
    }

    getTargetsActuals() {
         console.log('Refresh PRoduct ' + this.vSelectedTab);
         this._targetsActualsService.queryProduct(this.vSelectedTab, this.vSelectedBrand).subscribe(
             response => {
                if (response.json().status === 'Success') {
                    console.log('Query sukses ' + response.json());
                    this.vListProduct = response.json().result;
                     this.vShowProduct = this.vListProduct;
                }
            },
            error => {}
        );
    }

    showMenuDay() {
        this.vDayShow = true;
        this.vUnderlineDay = true;
        this.vUnderlineWeek = false;
        this.vUnderlineMonth = false;
        this.vWeekShow = false;
        this.vMonthShow = false;
        this.vSelectedTab = 'Day';
        this.getTargetsActuals();
    }

    showMenuWeek() {
        this.vWeekShow = true;
        this.vUnderlineWeek = true;
        this.vUnderlineDay = false;
        this.vUnderlineMonth = false;
        this.vDayShow = false;
        this.vMonthShow = false;
        this.vSelectedTab = 'Week';
        this.getTargetsActuals();
    }

    showMenuMonth() {
        this.vMonthShow = true;
        this.vUnderlineMonth = true;
        this.vUnderlineWeek = false;
        this.vUnderlineDay = false;
        this.vWeekShow = false;
        this.vDayShow = false;
        this.vSelectedTab = 'Month';
        this.getTargetsActuals();
    }

    onChangeSelectBrand(pSelectedBrand) {
        this.vSelectedBrand = pSelectedBrand;
        console.log(this.vSelectedBrand + ' IS SELECTED');
        this.getTargetsActuals();
    }

}