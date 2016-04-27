"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var FooterMenuComponent = (function () {
    function FooterMenuComponent(_layoutService, _router, _matchMediaService, _pageNavigationService) {
        this._layoutService = _layoutService;
        this._router = _router;
        this._matchMediaService = _matchMediaService;
        this._pageNavigationService = _pageNavigationService;
    }
    FooterMenuComponent.prototype.gotoStartDay = function () {
        console.log("Start Day");
        this._router.navigate(['StartDay']);
    };
    FooterMenuComponent.prototype.gotoBasicCallProcedure = function () {
        console.log("Basic");
        this._router.navigate(['BasicCallProcedure']);
    };
    FooterMenuComponent.prototype.gotoCloseDay = function () {
        console.log("Close Day");
        this._router.navigate(['CloseDay']);
    };
    FooterMenuComponent.prototype.gotoSettings = function () {
        console.log("Settings");
        this._router.navigate(['Settings']);
    };
    FooterMenuComponent = __decorate([
        core_1.Component({
            selector: 'idsp-footer-menu',
            templateUrl: 'app/shared/components/footer-menu.component.html'
        })
    ], FooterMenuComponent);
    return FooterMenuComponent;
}());
exports.FooterMenuComponent = FooterMenuComponent;
