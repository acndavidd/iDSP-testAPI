System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var PageNavigationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PageNavigationService = (function () {
                function PageNavigationService(_router) {
                    this._router = _router;
                    this.vCurrentParams = null;
                }
                PageNavigationService.prototype.getCurrentParams = function () {
                    return this.vCurrentParams;
                };
                PageNavigationService.prototype.setCurrentPage = function (pCurrentPage) {
                    this.vCurrentPage = pCurrentPage;
                };
                PageNavigationService.prototype.resetListPreviousData = function () {
                    this.vListPreviousData = null;
                };
                PageNavigationService.prototype.addListPreviousData = function (pPrevPage, pPrevParams) {
                    if (this.vListPreviousData === null) {
                        this.vListPreviousData = [];
                    }
                    var vPrevData = {
                        page: pPrevPage,
                        param: pPrevParams
                    };
                    this.vListPreviousData.push(vPrevData);
                };
                PageNavigationService.prototype.getLatestPreviousData = function () {
                    return this.vListPreviousData.pop();
                };
                PageNavigationService.prototype.gotoPreviousPage = function () {
                    var vPreviousPage;
                    var vPreviousParams;
                    if (this.vListPreviousData) {
                        console.log('Total Previous Page ' + this.vListPreviousData.length);
                        var vPreviousData = this.getLatestPreviousData();
                        console.log('Previous data adalah ' + JSON.stringify(vPreviousData));
                        vPreviousPage = vPreviousData.page;
                        vPreviousParams = vPreviousData.param;
                    }
                    else {
                        vPreviousPage = this.vCurrentPage;
                        vPreviousParams = null;
                    }
                    if (this.vChildNode === 'login') {
                        this._router.navigate(['Starter', vPreviousPage]);
                    }
                    else {
                        if (vPreviousParams !== null && vPreviousParams !== '') {
                            console.log('params is found' + vPreviousParams);
                        }
                        this.vCurrentParams = vPreviousParams;
                        this._router.navigate(['MainPage', vPreviousPage]);
                    }
                };
                PageNavigationService.prototype.navigate = function (pNewPage, pNewParams, pOldParams) {
                    console.log('Mau pindah page dari : ' + this.vCurrentPage + ' ke ' + pNewPage);
                    this.addListPreviousData(this.vCurrentPage, pOldParams);
                    if (pNewParams) {
                        this.vCurrentParams = pNewParams;
                    }
                    else {
                        this.vCurrentParams = null;
                    }
                    this.vCurrentPage = pNewPage;
                    console.log('Ready to navigate to ' + pNewPage);
                    this._router.navigate(['MainPage', pNewPage]);
                };
                PageNavigationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], PageNavigationService);
                return PageNavigationService;
            }());
            exports_1("PageNavigationService", PageNavigationService);
        }
    }
});
//# sourceMappingURL=page-navigation.service.js.map