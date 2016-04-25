"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var match_media_service_1 = require('./shared/services/match-media.service');
var layout_service_1 = require('./shared/services/layout.service');
var page_navigation_service_1 = require('./shared/services/page-navigation.service');
var login_component_1 = require('./login/components/login.component');
var header_component_1 = require('./shared/components/header.component');
var footer_menu_component_1 = require('./shared/components/footer-menu.component');
var start_day_component_1 = require('../app/start-day/components/start-day.component');
var basic_call_pro_component_1 = require('../app/basic-call-procedure/components/basic-call-pro.component');
var close_day_component_1 = require('../app/close-day/components/close-day.component');
var settings_component_1 = require('../app/settings/components/settings.component');
var IDSPComponent = (function () {
    function IDSPComponent(_matchMediaService, _router, _layoutService) {
        this._matchMediaService = _matchMediaService;
        this._router = _router;
        this._layoutService = _layoutService;
        new FastClick(document.body);
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
        var currentPage = this._layoutService.getCurrentPage();
        return !currentPage || currentPage === 'GetStarted' || currentPage === 'Login' ||
            currentPage === 'Register';
    };
    IDSPComponent.prototype.isSmallScreen = function () {
        return !this._matchMediaService.getmm().largeUp;
    };
    IDSPComponent = __decorate([
        core_1.Component({
            selector: 'idsp-app',
            template: "\n    \t<div id=\"content\"\n            (window:resize)=\"OnResize()\">\n            <idsp-header></idsp-header>\n    \t\t<router-outlet></router-outlet>\n            <idsp-footer-menu></idsp-footer-menu>\n    \t</div>\n    ",
            directives: [
                header_component_1.HeaderComponent,
                footer_menu_component_1.FooterMenuComponent,
                router_1.ROUTER_DIRECTIVES
            ],
            providers: [
                router_1.ROUTER_PROVIDERS,
                match_media_service_1.MatchMediaService,
                layout_service_1.LayoutService,
                page_navigation_service_1.PageNavigationService,
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
                path: '/startday',
                name: 'StartDay',
                component: start_day_component_1.StartDayComponent
            },
            {
                path: '/basiccallprocedure',
                name: 'BasicCallProcedure',
                component: basic_call_pro_component_1.BasicCallProcedureComponent
            },
            {
                path: '/closeday',
                name: 'CloseDay',
                component: close_day_component_1.CloseDayComponent
            },
            {
                path: '/settings',
                name: 'Settings',
                component: settings_component_1.SettingsComponent
            }
        ])
    ], IDSPComponent);
    return IDSPComponent;
}());
exports.IDSPComponent = IDSPComponent;
