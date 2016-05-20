System.register(['angular2/core', './page-navigation.service', './match-media.service'], function(exports_1, context_1) {
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
    var core_1, page_navigation_service_1, match_media_service_1;
    var LayoutService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            }],
        execute: function() {
            LayoutService = (function () {
                function LayoutService(_pageNavigationService, _matchMediaService) {
                    this._pageNavigationService = _pageNavigationService;
                    this._matchMediaService = _matchMediaService;
                    this.vNumberSelection = false;
                    this.vFilter = {
                        filterTargetsActuals: false,
                        filterInventoryLoad: false,
                        filterInventoryPhysical: false,
                        filterDSPAlerts: false,
                        filterAccReceivables: false,
                        filterRetailerRoute: false,
                        filterRetailerInventory: false
                    };
                    this.vLayoutState = {
                        appHeader: false,
                        appFooter: false,
                        leftMenu: false
                    };
                    this.vSearch = {
                        searchBox: false
                    };
                    // Unused
                    // vFooterItem = {
                    //     start: true,
                    //     call: true,
                    //     end: true,
                    //     setting: true
                    // };
                    // vFooterState = {
                    //     myTransaction: false,
                    //     basicCallProcedure :false,
                    //     closeDay : false,
                    //     settings :false
                    // };
                    this.vHeaderItem = {
                        hamburger: false,
                        back: false,
                        filter: false,
                        edit: false,
                        search: false
                    };
                }
                LayoutService.prototype.getCurrentPage = function () {
                    return this.vCurrentPage;
                };
                // getFooterState() {
                //     return this.vFooterState;
                // }
                // getFooterLayout() {
                //     return this.vFooterItem;
                // }
                LayoutService.prototype.getOldCurrentPage = function () {
                    return this.vOldCurrentPage;
                };
                LayoutService.prototype.setOldCurrentPage = function (pCurrentPage) {
                    this._pageNavigationService.addListPreviousData(pCurrentPage, null);
                    this.vOldCurrentPage = pCurrentPage;
                };
                /*
                    setOldCurrentPageData(pCurrentPage : string, pParams) {
                        this._pageNavigationService.addListPreviousData(pCurrentPage, pParams);
                        this.vOldCurrentPage = pCurrentPage;
                    }
                    */
                LayoutService.prototype.getLayout = function () {
                    return this.vLayoutState;
                };
                LayoutService.prototype.getFilter = function () {
                    return this.vFilter;
                };
                LayoutService.prototype.getSearch = function () {
                    return this.vSearch;
                };
                LayoutService.prototype.setNumberSelectionState = function () {
                    this.vNumberSelection = !this.vNumberSelection;
                };
                LayoutService.prototype.getNumberSelectionState = function () {
                    return this.vNumberSelection;
                };
                // getFooterItem() {
                //     return this.vFooterItem;
                // }
                LayoutService.prototype.getHeaderLayout = function () {
                    return this.vHeaderItem;
                };
                LayoutService.prototype.setOldCurrentPageParams = function (pParams) {
                    this.vOldCurrentPageParams = pParams;
                };
                LayoutService.prototype.setCurrentPage = function (pCurrent) {
                    this.vCurrentPage = pCurrent;
                    if (pCurrent === 'GetStarted' ||
                        pCurrent === 'Verification' ||
                        pCurrent === 'Login' ||
                        pCurrent === 'SkipSalesOrder') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: false,
                            appFooter: false,
                            leftMenu: false
                        };
                    }
                    else if (pCurrent === 'Mpin') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'Login';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                    }
                    else if (pCurrent === 'MyTransaction' ||
                        pCurrent === 'BasicCallProcedure' ||
                        pCurrent === 'CloseDay' ||
                        pCurrent === 'Remittance' ||
                        pCurrent === 'StockReturn' ||
                        pCurrent === 'Home') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: true,
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'TargetsActuals' ||
                        pCurrent === 'Inventory' ||
                        pCurrent === 'RetailerRoute' ||
                        pCurrent === 'AccountsReceivables' ||
                        pCurrent === 'DSPAlerts') {
                        // this._pageNavigationService.setPreviousPage('MyTransaction');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'MyTransaction';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: true,
                            back: false,
                            filter: true,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'Collection' ||
                        pCurrent === 'Sync') {
                        // this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'CloseDay';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: true,
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'CallPreparation') {
                        // this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'BasicCallProcedure';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vCurrentPointer = '1';
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'ResetPassword') {
                        // this._pageNavigationService.setPreviousPage('Settings');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'Settings';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: true,
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'RetailerSalesOrder'
                        || pCurrent === 'UnservedOrder') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'BasicCallProcedure';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vCurrentPointer = '4';
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'BCPCollection') {
                        this._pageNavigationService.resetListPreviousData();
                        // this.vOldCurrentPage = 'BasicCallProcedure';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vCurrentPointer = '2';
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'DetailRetailer'
                        || pCurrent === 'RetailerInventory') {
                        // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
                        // this._pageNavigationService.setPreviousPage('BasicCallProcedure');
                        // if (this.vOldCurrentPage! === null || this.vOldCurrentPage! === '') {
                        //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
                        // }
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'VisitedRetail') {
                        // this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = 'CloseDay';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: true,
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'BCPActivityStep') {
                        // this._pageNavigationService.setPreviousPage('DetailRetailer');
                        this._pageNavigationService.resetListPreviousData();
                        // this.vOldCurrentPage = 'CloseDay';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'Offer') {
                        // this._pageNavigationService.setPreviousPage('DetailRetailer');
                        this._pageNavigationService.resetListPreviousData();
                        // this.vOldCurrentPage = 'CloseDay';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vCurrentPointer = '3';
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent === 'SalesOrderPayment') {
                        // this._pageNavigationService.setPreviousPage('DetailRetailer');
                        this._pageNavigationService.resetListPreviousData();
                        // this.vOldCurrentPage = 'CloseDay';
                        this.vOldCurrentPageParams = null;
                        this._pageNavigationService.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: false,
                            leftMenu: false
                        };
                        this.vHeaderItem = {
                            hamburger: false,
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    console.log('In Layout Current Page ' + pCurrent);
                    this._pageNavigationService.setCurrentPage(pCurrent);
                };
                LayoutService.prototype.setFilter = function () {
                    this.vFilter.filterTargetsActuals = !this.vFilter.filterTargetsActuals;
                    this.vFilter.filterInventoryLoad = !this.vFilter.filterInventoryLoad;
                    this.vFilter.filterInventoryPhysical = !this.vFilter.filterInventoryPhysical;
                    this.vFilter.filterAccReceivables = !this.vFilter.filterAccReceivables;
                    this.vFilter.filterDSPAlerts = !this.vFilter.filterDSPAlerts;
                    this.vFilter.filterRetailerRoute = !this.vFilter.filterRetailerRoute;
                    this.vFilter.filterRetailerInventory = !this.vFilter.filterRetailerInventory;
                };
                LayoutService.prototype.setSearch = function () {
                    this.vSearch.searchBox = !this.vSearch.searchBox;
                };
                LayoutService.prototype.toggleLeftMenu = function () {
                    this.vLayoutState.leftMenu = !this.vLayoutState.leftMenu;
                };
                LayoutService.prototype.toggleHeader = function () {
                    // FOR LOGOUT ONLY
                    this.vLayoutState.appHeader = false;
                };
                LayoutService.prototype.getLeftMenuState = function () {
                    return this.vLayoutState.leftMenu;
                };
                LayoutService.prototype.getCurrentPointer = function () {
                    return this.vCurrentPointer;
                };
                LayoutService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [page_navigation_service_1.PageNavigationService, match_media_service_1.MatchMediaService])
                ], LayoutService);
                return LayoutService;
            }());
            exports_1("LayoutService", LayoutService);
        }
    }
});
//# sourceMappingURL=layout.service.js.map