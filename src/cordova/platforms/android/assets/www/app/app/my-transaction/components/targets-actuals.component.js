System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../my-transaction/services/targets-actuals.service', 'angular2/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, targets_actuals_service_1, common_1;
    var TargetsActualsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (targets_actuals_service_1_1) {
                targets_actuals_service_1 = targets_actuals_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            TargetsActualsComponent = (function () {
                function TargetsActualsComponent(_router, _layoutService, _matchMediaService, _headerService, _targetsActualsService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._targetsActualsService = _targetsActualsService;
                    this.vDayShow = true;
                    this.vWeekShow = false;
                    this.vMonthShow = false;
                    this.vUnderlineDay = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineMonth = false;
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
                TargetsActualsComponent.prototype.getBrand = function () {
                    return this._targetsActualsService.vBrand;
                    //return this._targetsActualsService.getBrand();
                };
                TargetsActualsComponent.prototype.getBrandSelected = function () {
                    return this._targetsActualsService.vBrand.brand[0];
                    //return this._targetsActualsService.getBrand();
                };
                TargetsActualsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                TargetsActualsComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                TargetsActualsComponent.prototype.showMenuDay = function () {
                    this.vDayShow = true;
                    this.vUnderlineDay = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineMonth = false;
                    this.vWeekShow = false;
                    this.vMonthShow = false;
                };
                TargetsActualsComponent.prototype.showMenuWeek = function () {
                    this.vWeekShow = true;
                    this.vUnderlineWeek = true;
                    this.vUnderlineDay = false;
                    this.vUnderlineMonth = false;
                    this.vDayShow = false;
                    this.vMonthShow = false;
                };
                TargetsActualsComponent.prototype.showMenuMonth = function () {
                    this.vMonthShow = true;
                    this.vUnderlineMonth = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineDay = false;
                    this.vWeekShow = false;
                    this.vDayShow = false;
                };
                // refreshBrand(){
                //     this.vListBrands = this._targetsActualsService.queryBrand();
                //     //console.log('asdadasdasdada');
                //     //console.log(this.vListBrands );
                // }
                TargetsActualsComponent.prototype.onChangeSelectBrand = function (pSelectedBrand) {
                    this.vSelectedBrand = pSelectedBrand;
                    console.log(this.vSelectedBrand + " IS SELECTED");
                };
                TargetsActualsComponent.prototype.getProdCat = function () {
                    return this._targetsActualsService.vProdCat;
                };
                TargetsActualsComponent = __decorate([
                    core_1.Component({
                        selector: 'targets-actuals',
                        templateUrl: './app/my-transaction/components/targets-actuals.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            targets_actuals_service_1.TargetsActualsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, targets_actuals_service_1.TargetsActualsService])
                ], TargetsActualsComponent);
                return TargetsActualsComponent;
            }());
            exports_1("TargetsActualsComponent", TargetsActualsComponent);
        }
    }
});
//# sourceMappingURL=targets-actuals.component.js.map