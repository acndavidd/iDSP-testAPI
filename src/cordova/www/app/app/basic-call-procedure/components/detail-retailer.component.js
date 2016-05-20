System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/retailer.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, retailer_service_1;
    var DetailRetailerComponent;
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
            function (retailer_service_1_1) {
                retailer_service_1 = retailer_service_1_1;
            }],
        execute: function() {
            DetailRetailerComponent = (function () {
                function DetailRetailerComponent(_layoutService, _matchMediaService, _headerService, _retailerService, _router, _params) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._retailerService = _retailerService;
                    this._router = _router;
                    this._params = _params;
                    this.vMenuShow = false;
                    this.vArrowMap = false;
                    this.vSelectedRetailId = this._params.get("retailer_id");
                    this.vSelectedRetailSeq = this._params.get("route_sequence");
                    this.vSelectedRetail = this._retailerService.getRetailerDetail(this.vSelectedRetailId);
                    console.log(this.vSelectedRetail);
                    this._layoutService.setCurrentPage('DetailRetailer');
                    this._headerService.setTitle("Detail Retailer");
                    console.log('in detail retailer for retailer id ' + this.vSelectedRetailId);
                }
                DetailRetailerComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                DetailRetailerComponent.prototype.getRetailer = function () {
                    return this.vSelectedRetail;
                };
                DetailRetailerComponent.prototype.subMenuShow = function () {
                    this.vMenuShow = !this.vMenuShow;
                    this.vArrowMap = !this.vArrowMap;
                };
                DetailRetailerComponent.prototype.goToInventoryRetailer = function (pRetailerId) {
                    console.log(pRetailerId);
                    var vParamsOld = {
                        retailer_id: this.vSelectedRetailId,
                        route_sequence: this.vSelectedRetailSeq
                    };
                    this._layoutService.addListPreviousData('DetailRetailer', vParamsOld);
                    /*
                    this._layoutService.setOldCurrentPage('DetailRetailer');
                    this._layoutService.setOldCurrentPageParams(vParamsOld);
                    */
                    var vParams = {
                        retailer_id: pRetailerId.retailer_id
                    };
                    this._router.navigate(['RetailerInventory', vParams]);
                };
                DetailRetailerComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/detail-retailer.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, retailer_service_1.RetailerService, router_1.Router, router_1.RouteParams])
                ], DetailRetailerComponent);
                return DetailRetailerComponent;
            }());
            exports_1("DetailRetailerComponent", DetailRetailerComponent);
        }
    }
});
//# sourceMappingURL=detail-retailer.component.js.map