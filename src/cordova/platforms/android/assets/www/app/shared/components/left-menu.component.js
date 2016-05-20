System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/page-navigation.service', '../../shared/services/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1, authentication_service_1;
    var LeftMenuComponent;
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
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LeftMenuComponent = (function () {
                function LeftMenuComponent(_layoutService, _router, _matchMediaService, _authenticationService, _headerService, _pageNavigationService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._authenticationService = _authenticationService;
                    this._headerService = _headerService;
                    this._pageNavigationService = _pageNavigationService;
                    this.image = null;
                }
                LeftMenuComponent.prototype.ngOnInit = function () {
                };
                LeftMenuComponent.prototype.toggleLeftMenu = function () {
                    this._layoutService.toggleLeftMenu();
                };
                LeftMenuComponent.prototype.getLeftMenuState = function () {
                    return this._layoutService.getLeftMenuState();
                };
                LeftMenuComponent.prototype.checkCurrentPage = function (pGoToPage) {
                    this.vCurrentPage = this._layoutService.getCurrentPage();
                    console.log(pGoToPage + ' - ' + this.vCurrentPage);
                    if (pGoToPage === this.vCurrentPage) {
                        this.toggleLeftMenu();
                    }
                    else {
                        this._pageNavigationService.navigate(pGoToPage, null, null);
                    }
                };
                LeftMenuComponent.prototype.goToHome = function () {
                    this.vGoToPage = 'Home';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToMyDashboard = function () {
                    this.vGoToPage = 'MyTransaction';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToTargets = function () {
                    this.vGoToPage = 'TargetsActuals';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToInventory = function () {
                    this.vGoToPage = 'Inventory';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToRetailerRoute = function () {
                    this.vGoToPage = 'RetailerRoute';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToAccountReceivables = function () {
                    this.vGoToPage = 'AccountsReceivables';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToThresholdAlerts = function () {
                    this.vGoToPage = 'DSPAlerts';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToBasicCallProcedure = function () {
                    this.vGoToPage = 'BasicCallProcedure';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToCloseOfTheDay = function () {
                    this.vGoToPage = 'CloseDay';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToVisitedRetailerRoute = function () {
                    this.vGoToPage = 'VisitedRetail';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToCollection = function () {
                    this.vGoToPage = 'Collection';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToRemittance = function () {
                    this.vGoToPage = 'Remittance';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToStockReturn = function () {
                    this.vGoToPage = 'StockReturn';
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToLogout = function () {
                    this._layoutService.toggleLeftMenu();
                    this._layoutService.toggleHeader();
                    this._router.navigate(['Starter', 'Login']);
                };
                LeftMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'left-menu',
                        templateUrl: 'app/shared/components/left-menu.component.html'
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, authentication_service_1.AuthenticationService, header_service_1.HeaderService, page_navigation_service_1.PageNavigationService])
                ], LeftMenuComponent);
                return LeftMenuComponent;
            }());
            exports_1("LeftMenuComponent", LeftMenuComponent);
        }
    }
});
//# sourceMappingURL=left-menu.component.js.map