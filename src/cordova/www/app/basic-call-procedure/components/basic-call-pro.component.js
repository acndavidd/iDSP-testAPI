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
    var BasicCallProcedureComponent;
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
            BasicCallProcedureComponent = (function () {
                function BasicCallProcedureComponent(_layoutService, _matchMediaService, _headerService, _retailerService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._retailerService = _retailerService;
                    this._router = _router;
                    this._retailerService.getRetailer(100);
                    this._layoutService.setCurrentPage('BasicCallProcedure');
                    this._headerService.setTitle('Basic Call Procedure');
                }
                BasicCallProcedureComponent.prototype.getResize = function () {
                    return this._matchMediaService.getmm();
                };
                BasicCallProcedureComponent.prototype.gotoDetailRetailer = function () {
                    console.log('aaa');
                    this._router.navigate(['DetailRetailer']);
                };
                BasicCallProcedureComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/basic-call-pro.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, retailer_service_1.RetailerService, router_1.Router])
                ], BasicCallProcedureComponent);
                return BasicCallProcedureComponent;
            }());
            exports_1("BasicCallProcedureComponent", BasicCallProcedureComponent);
        }
    }
});
//# sourceMappingURL=basic-call-pro.component.js.map