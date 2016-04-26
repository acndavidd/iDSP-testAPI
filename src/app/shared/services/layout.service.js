"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var LayoutService = (function () {
    function LayoutService() {
        this.numberSelection = false;
        this.layoutState = {
            appHeader: true,
            appFooter: true
        };
        this.footerItem = {
            start: true,
            call: true,
            end: true,
            setting: true
        };
    }
    /*
    constructor (private _http: Http,
    private _pageNavigationService: PageNavigationService,
    private _matchMediaService: MatchMediaService) {
        const url = 'config/layout.json';
        this._http.get(
            url,
            <RequestOptionsArgs>{
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                })
            }).subscribe(file => {
                let layout = file.json();
                console.log(layout);
            });
        }
    */
    LayoutService.prototype.getCurrentPage = function () {
        return this.currentPage;
    };
    LayoutService.prototype.getFooterLayout = function () {
        return this.footerItem;
    };
    LayoutService.prototype.setCurrentPage = function (current) {
        this.currentPage = current;
    };
    LayoutService.prototype.getLayout = function () {
        return this.layoutState;
    };
    LayoutService.prototype.setNumberSelectionState = function () {
        this.numberSelection = !this.numberSelection;
    };
    LayoutService.prototype.getNumberSelectionState = function () {
        return this.numberSelection;
    };
    LayoutService = __decorate([
        core_1.Injectable()
    ], LayoutService);
    return LayoutService;
}());
exports.LayoutService = LayoutService;
