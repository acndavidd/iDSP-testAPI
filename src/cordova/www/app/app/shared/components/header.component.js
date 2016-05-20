System.register(['angular2/core', 'angular2/router', '../services/layout.service', '../../shared/services/match-media.service', '../../shared/services/page-navigation.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, layout_service_1, match_media_service_1, page_navigation_service_1, header_service_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_layoutService, _router, _matchMediaService, _pageNavigationService, _headerService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._pageNavigationService = _pageNavigationService;
                    this._headerService = _headerService;
                }
                HeaderComponent.prototype.ngOnInit = function () {
                };
                HeaderComponent.prototype.getTitle = function () {
                    return this._headerService.getTitle();
                };
                HeaderComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                HeaderComponent.prototype.getHeaderLayout = function () {
                    return this._layoutService.getHeaderLayout();
                };
                HeaderComponent.prototype.goToPreviousPage = function () {
                    this._pageNavigationService.gotoPreviousPage();
                };
                HeaderComponent.prototype.toggleSearch = function () {
                    this._layoutService.setSearch();
                };
                HeaderComponent.prototype.toggleFilter = function () {
                    this._layoutService.setFilter();
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'idsp-header',
                        templateUrl: 'app/shared/components/header.component.html'
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, page_navigation_service_1.PageNavigationService, header_service_1.HeaderService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map