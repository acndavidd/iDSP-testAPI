System.register(['angular2/core', 'angular2/router', './shared/services/match-media.service', './shared/services/layout.service', './shared/services/header.service', './shared/services/page-navigation.service', './shared/services/sqlite.service', './shared/services/authentication.service', './login/components/login.component', './shared/components/header.component', './shared/components/footer-menu.component', './shared/components/main-page.component', './verification/components/verification.component', './login/components/mpin.component', './shared/components/modal.component', './my-transaction/components/retailer-route.component', './shared/services/modal.service', './shared/services/retailer.service', './basic-call-procedure/components/retailer-sales-order.component', './basic-call-procedure/components/detail-retailer.component', './basic-call-procedure/components/sales-order-payment.component', './shared/components/left-menu.component'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1, sqlite_service_1, authentication_service_1, login_component_1, header_component_1, footer_menu_component_1, main_page_component_1, verification_component_1, mpin_component_1, modal_component_1, retailer_route_component_1, modal_service_1, retailer_service_1, retailer_sales_order_component_1, detail_retailer_component_1, sales_order_payment_component_1, left_menu_component_1;
    var IDSPComponent;
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
            function (sqlite_service_1_1) {
                sqlite_service_1 = sqlite_service_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (footer_menu_component_1_1) {
                footer_menu_component_1 = footer_menu_component_1_1;
            },
            function (main_page_component_1_1) {
                main_page_component_1 = main_page_component_1_1;
            },
            function (verification_component_1_1) {
                verification_component_1 = verification_component_1_1;
            },
            function (mpin_component_1_1) {
                mpin_component_1 = mpin_component_1_1;
            },
            function (modal_component_1_1) {
                modal_component_1 = modal_component_1_1;
            },
            function (retailer_route_component_1_1) {
                retailer_route_component_1 = retailer_route_component_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (retailer_service_1_1) {
                retailer_service_1 = retailer_service_1_1;
            },
            function (retailer_sales_order_component_1_1) {
                retailer_sales_order_component_1 = retailer_sales_order_component_1_1;
            },
            function (detail_retailer_component_1_1) {
                detail_retailer_component_1 = detail_retailer_component_1_1;
            },
            function (sales_order_payment_component_1_1) {
                sales_order_payment_component_1 = sales_order_payment_component_1_1;
            },
            function (left_menu_component_1_1) {
                left_menu_component_1 = left_menu_component_1_1;
            }],
        execute: function() {
            IDSPComponent = (function () {
                function IDSPComponent(_matchMediaService, _router, _layoutService, _pageNavigationService, _renderer, _sqliteService) {
                    var _this = this;
                    this._matchMediaService = _matchMediaService;
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._pageNavigationService = _pageNavigationService;
                    this._renderer = _renderer;
                    this._sqliteService = _sqliteService;
                    new FastClick(document.body);
                    this.globalListenFunc = _renderer.listenGlobal('document', 'backbutton', function (event) {
                        // put pageNavigationService
                        _this._pageNavigationService.gotoPreviousPage();
                        console.log('angular back button');
                    });
                }
                IDSPComponent.prototype.ngOnInit = function () {
                    this.OnResize();
                    if (configChannel === 'app') {
                        this._router.navigate(['Starter', 'Login']);
                    }
                };
                IDSPComponent.prototype.OnResize = function () {
                    this._matchMediaService.OnResize();
                };
                IDSPComponent.prototype.isFullScreen = function () {
                    var vCurrentPage = this._layoutService.getCurrentPage();
                    return !vCurrentPage || vCurrentPage === 'GetStarted' || vCurrentPage === 'Login' ||
                        vCurrentPage === 'Register';
                };
                IDSPComponent.prototype.isSmallScreen = function () {
                    return !this._matchMediaService.getMm().largeUp;
                };
                IDSPComponent.prototype.OnHashChange = function () {
                    console.log('anjayy');
                };
                IDSPComponent.prototype.ngOnDestroy = function () {
                    this.globalListenFunc();
                };
                IDSPComponent = __decorate([
                    core_1.Component({
                        selector: 'idsp-app',
                        template: "\n        <div id=\"content\"\n            (window:resize)=\"OnResize()\"\n            onhashchange=\"OnHashChange()\">\n            <idsp-header></idsp-header>\n            <my-modal></my-modal>\n            <left-menu></left-menu>\n            <router-outlet></router-outlet>\n            <idsp-footer-menu></idsp-footer-menu>\n        </div>\n    ",
                        directives: [
                            header_component_1.HeaderComponent,
                            footer_menu_component_1.FooterMenuComponent,
                            modal_component_1.ModalComponent,
                            router_1.ROUTER_DIRECTIVES,
                            left_menu_component_1.LeftMenuComponent
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            match_media_service_1.MatchMediaService,
                            layout_service_1.LayoutService,
                            page_navigation_service_1.PageNavigationService,
                            sqlite_service_1.SQLiteService,
                            authentication_service_1.AuthenticationService,
                            modal_service_1.ModalService,
                            header_service_1.HeaderService,
                            retailer_service_1.RetailerService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/login',
                            name: 'Starter',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/verification',
                            name: 'Verification',
                            component: verification_component_1.VerificationComponent
                        },
                        {
                            path: './...',
                            name: 'MainPage',
                            component: main_page_component_1.MainPageComponent
                        },
                        {
                            path: '/mPin',
                            name: 'Mpin',
                            component: mpin_component_1.MpinComponent
                        },
                        {
                            path: '/retailerRoute',
                            name: 'RetailerRoute',
                            component: retailer_route_component_1.RetailerRouteComponent
                        },
                        {
                            path: '/retailerSalesOrder',
                            name: 'RetailerSalesOrder',
                            component: retailer_sales_order_component_1.RetailerSalesOrderComponent
                        },
                        {
                            path: '/detailRetailer',
                            name: 'DetailRetailer',
                            component: detail_retailer_component_1.DetailRetailerComponent
                        },
                        {
                            path: '/salesOrderPayment',
                            name: 'SalesOrderPayment',
                            component: sales_order_payment_component_1.SalesOrderPaymentComponent
                        },
                        {
                            path: '/**',
                            redirectTo: ['Starter', 'Login']
                        }
                    ]), 
                    __metadata('design:paramtypes', [match_media_service_1.MatchMediaService, router_1.Router, layout_service_1.LayoutService, page_navigation_service_1.PageNavigationService, core_1.Renderer, sqlite_service_1.SQLiteService])
                ], IDSPComponent);
                return IDSPComponent;
            }());
            exports_1("IDSPComponent", IDSPComponent);
        }
    }
});
//# sourceMappingURL=idsp.component.js.map