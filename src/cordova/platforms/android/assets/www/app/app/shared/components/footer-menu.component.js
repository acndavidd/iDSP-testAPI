System.register(['angular2/core', 'angular2/router', '../services/layout.service', '../../shared/services/match-media.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, layout_service_1, match_media_service_1, page_navigation_service_1;
    var FooterMenuComponent;
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
            }],
        execute: function() {
            FooterMenuComponent = (function () {
                function FooterMenuComponent(_layoutService, _router, _matchMediaService, _pageNavigationService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._pageNavigationService = _pageNavigationService;
                }
                FooterMenuComponent.prototype.goToMyTransaction = function () {
                    console.log("My Transaction");
                    this._router.navigate(['MainPage', 'MyTransaction']);
                };
                FooterMenuComponent.prototype.goToBasicCallProcedure = function () {
                    console.log("Basic");
                    this._router.navigate(['MainPage', 'BasicCallProcedure']);
                };
                FooterMenuComponent.prototype.goToCloseDay = function () {
                    console.log("Close Day");
                    this._router.navigate(['MainPage', 'CloseDay']);
                };
                FooterMenuComponent.prototype.goToSettings = function () {
                    console.log("Settings");
                    this._router.navigate(['MainPage', 'Settings']);
                };
                FooterMenuComponent.prototype.getFooterItem = function () {
                    console.log("Footer item");
                    return this._layoutService.getFooterItem();
                };
                FooterMenuComponent.prototype.getFooterState = function () {
                    return this._layoutService.getFooterState();
                };
                FooterMenuComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                FooterMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'idsp-footer-menu',
                        templateUrl: 'app/shared/components/footer-menu.component.html'
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, page_navigation_service_1.PageNavigationService])
                ], FooterMenuComponent);
                return FooterMenuComponent;
            }());
            exports_1("FooterMenuComponent", FooterMenuComponent);
        }
    }
});
//# sourceMappingURL=footer-menu.component.js.map