System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1;
    var CallPreparationComponent;
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
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            }],
        execute: function() {
            CallPreparationComponent = (function () {
                function CallPreparationComponent(_layoutService, _matchMediaService, _headerService, _pageNavigationService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._pageNavigationService = _pageNavigationService;
                    this._router = _router;
                    this.vProfileMenuShow = false;
                    this.vCollectionMenuShow = false;
                    this.vLoadMenuShow = false;
                    this.vPhysicalMenuShow = false;
                    this._layoutService.setCurrentPage('CallPreparation');
                    this._headerService.setTitle('Call Preparation');
                }
                CallPreparationComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                CallPreparationComponent.prototype.gotoBCPActivityStep = function () {
                    this._pageNavigationService.navigate('BCPActivityStep', null, null);
                };
                CallPreparationComponent.prototype.subProfileMenuShow = function () {
                    this.vProfileMenuShow = !this.vProfileMenuShow;
                };
                CallPreparationComponent.prototype.subCollectionMenuShow = function () {
                    this.vCollectionMenuShow = !this.vCollectionMenuShow;
                };
                CallPreparationComponent.prototype.subLoadMenuShow = function () {
                    this.vLoadMenuShow = !this.vLoadMenuShow;
                };
                CallPreparationComponent.prototype.subPhysicalMenuShow = function () {
                    this.vPhysicalMenuShow = !this.vPhysicalMenuShow;
                };
                CallPreparationComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/call-preparation.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, page_navigation_service_1.PageNavigationService, router_1.Router])
                ], CallPreparationComponent);
                return CallPreparationComponent;
            }());
            exports_1("CallPreparationComponent", CallPreparationComponent);
        }
    }
});
//# sourceMappingURL=call-preparation.component.js.map