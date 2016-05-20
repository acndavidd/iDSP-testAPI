System.register(['angular2/core', 'angular2/router', '../services/layout.service', '../../shared/services/header.service', '../../shared/services/match-media.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, layout_service_1, header_service_1, match_media_service_1, page_navigation_service_1;
    var HomeComponent;
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
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_layoutService, _router, _matchMediaService, _headerService, _pageNavigationService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._pageNavigationService = _pageNavigationService;
                    this._layoutService.setCurrentPage('Home');
                    this._headerService.setTitle('Home');
                    this.vDate = new Date();
                }
                HomeComponent.prototype.getToday = function () {
                    return this.vDate;
                };
                HomeComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                HomeComponent.prototype.goToTargetsActuals = function () {
                    console.log('PEGI KE TARGET ACTUAL');
                    this._pageNavigationService.navigate('TargetsActuals', null, null);
                };
                HomeComponent.prototype.goToInventory = function () {
                    console.log('PEGI KE INVENTORY');
                    this._pageNavigationService.navigate('Inventory', null, null);
                };
                HomeComponent.prototype.goToRetailerRoute = function () {
                    console.log('PEGI KE RETAILER ROUTE');
                    this._pageNavigationService.navigate('RetailerRoute', null, null);
                };
                HomeComponent.prototype.goToAccountsReceivables = function () {
                    console.log('Go to Account Receivables');
                    this._pageNavigationService.navigate('AccountsReceivables', null, null);
                };
                HomeComponent.prototype.goToDSPAlerts = function () {
                    console.log('PEGI KE DSP');
                    this._pageNavigationService.navigate('DSPAlerts', null, null);
                };
                HomeComponent.prototype.goToBasicCallProcedure = function () {
                    console.log('PEGI KE BCP');
                    this._pageNavigationService.navigate('BasicCallProcedure', null, null);
                };
                HomeComponent.prototype.goToRemittance = function () {
                    console.log('PEGI KE Remittance');
                    this._pageNavigationService.navigate('Remittance', null, null);
                };
                HomeComponent.prototype.goToStockReturn = function () {
                    console.log('PEGI KE StockReturn');
                    this._pageNavigationService.navigate('StockReturn', null, null);
                };
                HomeComponent.prototype.goToLogout = function () {
                    console.log('PEGI KE Login');
                    this._router.parent.navigate(['Starter', 'Login']);
                };
                HomeComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home',
                        templateUrl: 'app/shared/components/home.component.html'
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, header_service_1.HeaderService, page_navigation_service_1.PageNavigationService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map