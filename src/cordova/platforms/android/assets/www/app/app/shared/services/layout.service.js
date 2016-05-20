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
                        appFooter: false
                    };
                    this.vSearch = {
                        searchBox: false
                    };
                    //Unused
                    this.vFooterItem = {
                        start: true,
                        call: true,
                        end: true,
                        setting: true
                    };
                    this.vFooterState = {
                        myTransaction: false,
                        basicCallProcedure: false,
                        closeDay: false,
                        settings: false
                    };
                    this.vHeaderItem = {
                        back: false,
                        filter: false,
                        edit: false,
                        search: false
                    };
                }
                LayoutService.prototype.resetListPreviousData = function () {
                    this.vListPreviousData = null;
                };
                LayoutService.prototype.addListPreviousData = function (pPrevPage, pPrevParams) {
                    if (this.vListPreviousData === null) {
                        this.vListPreviousData = [];
                    }
                    var vPrevData = {
                        page: pPrevPage,
                        param: pPrevParams
                    };
                    this.vListPreviousData.push(vPrevData);
                };
                LayoutService.prototype.getLatestPreviousData = function () {
                    return this.vListPreviousData.pop();
                };
                LayoutService.prototype.getCurrentPage = function () {
                    return this.vCurrentPage;
                };
                LayoutService.prototype.getFooterState = function () {
                    return this.vFooterState;
                };
                //getFooterLayout(){
                //    return this.vFooterItem;
                //}
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
                LayoutService.prototype.getFooterItem = function () {
                    return this.vFooterItem;
                };
                LayoutService.prototype.getHeaderLayout = function () {
                    return this.vHeaderItem;
                };
                LayoutService.prototype.setOldCurrentPageParams = function (pParams) {
                    this.vOldCurrentPageParams = pParams;
                };
                LayoutService.prototype.setCurrentPage = function (pCurrent) {
                    this.vCurrentPage = pCurrent;
                    if (pCurrent == 'GetStarted' ||
                        pCurrent == 'Verification' ||
                        pCurrent == 'Login') {
                        this.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: false,
                            appFooter: false
                        };
                    }
                    else if (pCurrent == 'MyTransaction') {
                        this.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: true,
                                basicCallProcedure: false,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'BasicCallProcedure') {
                        this.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: true,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'CloseDay') {
                        this.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: true,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'Settings') {
                        this.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: false,
                                settings: true
                            };
                        this.vHeaderItem = {
                            back: false,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'AccountsReceivables' ||
                        pCurrent == 'DSPAlerts') {
                        //this._pageNavigationService.setPreviousPage('MyTransaction');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "MyTransaction";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: true,
                                basicCallProcedure: false,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: true,
                            edit: false,
                            search: false
                        };
                        if (pCurrent == 'AccountsReceivables') {
                            this.vHeaderItem = {
                                back: true,
                                filter: true,
                                edit: false,
                                search: false
                            };
                        }
                        if (pCurrent == 'DSPAlerts') {
                            this.vHeaderItem = {
                                back: true,
                                filter: true,
                                edit: false,
                                search: false
                            };
                        }
                    }
                    else if (pCurrent == 'RetailerRoute' ||
                        pCurrent == 'Inventory' ||
                        pCurrent == 'TargetsActuals') {
                        //this._pageNavigationService.setPreviousPage('MyTransaction');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "MyTransaction";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: true,
                                basicCallProcedure: false,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: true,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'Collection' ||
                        pCurrent == 'StockReturn' ||
                        pCurrent == 'Sync') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: true,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'ResetPassword') {
                        //this._pageNavigationService.setPreviousPage('Settings');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "Settings";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: false,
                                settings: true
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'RetailerSalesOrder'
                        || pCurrent == 'SalesOrderPayment') {
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "BasicCallProcedure";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: true,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'DetailRetailer'
                        || pCurrent == 'RetailerInventory') {
                        // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
                        //this._pageNavigationService.setPreviousPage("BasicCallProcedure");
                        //if(this.vOldCurrentPage!==null || this.vOldCurrentPage!==""){
                        //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
                        //}
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: true,
                                closeDay: false,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'CDTargetsActuals') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: true,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: true,
                            edit: false,
                            search: false
                        };
                    }
                    else if (pCurrent == 'VisitedRetail') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
                        this.vOldCurrentPageParams = null;
                        this.addListPreviousData(this.vOldCurrentPage, this.vOldCurrentPageParams);
                        this.vLayoutState = {
                            appHeader: true,
                            appFooter: true
                        };
                        this.vFooterState =
                            {
                                myTransaction: false,
                                basicCallProcedure: false,
                                closeDay: true,
                                settings: false
                            };
                        this.vHeaderItem = {
                            back: true,
                            filter: false,
                            edit: false,
                            search: false
                        };
                    }
                    if (this.vListPreviousData) {
                        console.log("Total Previous Page " + this.vListPreviousData.length);
                        var vPreviousData = this.getLatestPreviousData();
                        this._pageNavigationService.setPreviousPage(vPreviousData.page);
                        this._pageNavigationService.setPreviousParams(vPreviousData.params);
                    }
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