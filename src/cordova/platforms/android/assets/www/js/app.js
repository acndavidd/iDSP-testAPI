System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/retailer.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, retailer_service_1, page_navigation_service_1;
    var BasicCallProcedureComponent;
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
            function (retailer_service_1_1) {
                retailer_service_1 = retailer_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            }],
        execute: function() {
            BasicCallProcedureComponent = (function () {
                function BasicCallProcedureComponent(_layoutService, _matchMediaService, _headerService, _retailerService, _pageNavigationService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._retailerService = _retailerService;
                    this._pageNavigationService = _pageNavigationService;
                    this._router = _router;
                    this._retailerService.getRetailer(100);
                    this._layoutService.setCurrentPage('BasicCallProcedure');
                    this._headerService.setTitle('Basic Call Procedure');
                }
                BasicCallProcedureComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                BasicCallProcedureComponent.prototype.gotoDetailRetailer = function () {
                    this._pageNavigationService.navigate('DetailRetailer', null, null);
                };
                BasicCallProcedureComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/basic-call-procedure.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, retailer_service_1.RetailerService, page_navigation_service_1.PageNavigationService, router_1.Router])
                ], BasicCallProcedureComponent);
                return BasicCallProcedureComponent;
            }());
            exports_1("BasicCallProcedureComponent", BasicCallProcedureComponent);
        }
    }
});
//# sourceMappingURL=basic-call-procedure.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/retailer.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, retailer_service_1, page_navigation_service_1;
    var DetailRetailerComponent;
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
            function (retailer_service_1_1) {
                retailer_service_1 = retailer_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            }],
        execute: function() {
            DetailRetailerComponent = (function () {
                function DetailRetailerComponent(_layoutService, _matchMediaService, _headerService, _retailerService, _router, _params, _pageNavigationService) {
                    var _this = this;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._retailerService = _retailerService;
                    this._router = _router;
                    this._params = _params;
                    this._pageNavigationService = _pageNavigationService;
                    this.vMenuShow = false;
                    this.vArrowMap = false;
                    console.log(this._pageNavigationService.getCurrentParams());
                    if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
                        this.vSelectedRetailId = this._pageNavigationService.getCurrentParams().retailer_id;
                        this.vSelectedRetailSeq = this._pageNavigationService.getCurrentParams().route_sequence;
                    }
                    else {
                        console.log("Retailer ID not found");
                    }
                    console.log('in detail retailer for retailer id ' + this.vSelectedRetailId);
                    this._retailerService.getRetailerSummary(this.vSelectedRetailId).subscribe(function (response) {
                        if (response.json().status == 'Success') {
                            console.log("Query Success" + JSON.stringify(response.json().result));
                            _this.vSelectedRetail = response.json().result;
                            _this.vSelectedRetail.retailer.birthday = new Date(_this.vSelectedRetail.retailer.birthday);
                            console.log("Abis format" + JSON.stringify(_this.vSelectedRetail));
                        }
                        else {
                            console.log("Query Failed");
                        }
                    }, function (error) {
                        console.log(error);
                        //this.vErrorMsg = 'Failed connecting to login service';
                    });
                    //console.log(this.vSelectedRetail);
                    this._layoutService.setCurrentPage('DetailRetailer');
                    this._headerService.setTitle("Detail Retailer");
                }
                DetailRetailerComponent.prototype.getSelectedRetailer = function () {
                    return this.vSelectedRetail;
                };
                DetailRetailerComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                DetailRetailerComponent.prototype.getRetailer = function () {
                    return this.vSelectedRetail;
                };
                DetailRetailerComponent.prototype.subMenuShow = function () {
                    this.vMenuShow = !this.vMenuShow;
                    this.vArrowMap = !this.vArrowMap;
                };
                DetailRetailerComponent.prototype.goToInventoryRetailer = function (pRetailerId) {
                    console.log(pRetailerId);
                    var vParamsOld = this._pageNavigationService.getCurrentParams();
                    var vParams = {};
                    this._pageNavigationService.navigate('RetailerInventory', vParams, vParamsOld);
                };
                DetailRetailerComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/detail-retailer.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, retailer_service_1.RetailerService, router_1.Router, router_1.RouteParams, page_navigation_service_1.PageNavigationService])
                ], DetailRetailerComponent);
                return DetailRetailerComponent;
            }());
            exports_1("DetailRetailerComponent", DetailRetailerComponent);
        }
    }
});
//# sourceMappingURL=detail-retailer.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1;
    var RetailerInventoryComponent;
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
            }],
        execute: function() {
            RetailerInventoryComponent = (function () {
                function RetailerInventoryComponent(_layoutService, _matchMediaService, _headerService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this.vMenuShow = false;
                    this.vArrowMap = false;
                    this._layoutService.setCurrentPage('RetailerInventory');
                    this._headerService.setTitle("Retailer Inventory");
                }
                RetailerInventoryComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                RetailerInventoryComponent.prototype.subMenuShow = function () {
                    this.vMenuShow = !this.vMenuShow;
                    this.vArrowMap = !this.vArrowMap;
                };
                RetailerInventoryComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/basic-call-procedure/components/retailer-inventory.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService])
                ], RetailerInventoryComponent);
                return RetailerInventoryComponent;
            }());
            exports_1("RetailerInventoryComponent", RetailerInventoryComponent);
        }
    }
});
//# sourceMappingURL=retailer-inventory.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1;
    var RetailerSalesOrderComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            RetailerSalesOrderComponent = (function () {
                function RetailerSalesOrderComponent(_layoutService, _matchMediaService, _headerService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._layoutService.setCurrentPage('RetailerSalesOrder');
                    this._headerService.setTitle("Retailer Sales Order");
                }
                RetailerSalesOrderComponent.prototype.goToSalesOrderPayment = function () {
                    console.log('Go to Sales Order Payment');
                    this._router.navigate(['SalesOrderPayment']);
                };
                RetailerSalesOrderComponent = __decorate([
                    core_1.Component({
                        selector: 'retailer-sales-order',
                        templateUrl: './app/basic-call-procedure/components/retailer-sales-order.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router])
                ], RetailerSalesOrderComponent);
                return RetailerSalesOrderComponent;
            }());
            exports_1("RetailerSalesOrderComponent", RetailerSalesOrderComponent);
        }
    }
});
//# sourceMappingURL=retailer-sales-order.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1;
    var SalesOrderPaymentComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SalesOrderPaymentComponent = (function () {
                function SalesOrderPaymentComponent(_layoutService, _matchMediaService, _headerService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._layoutService.setCurrentPage('SalesOrderPayment');
                    this._headerService.setTitle("Sales Order Payment");
                }
                SalesOrderPaymentComponent = __decorate([
                    core_1.Component({
                        selector: 'sales-order-payment',
                        templateUrl: './app/basic-call-procedure/components/sales-order-payment.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router])
                ], SalesOrderPaymentComponent);
                return SalesOrderPaymentComponent;
            }());
            exports_1("SalesOrderPaymentComponent", SalesOrderPaymentComponent);
        }
    }
});
//# sourceMappingURL=sales-order-payment.component.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var RetailerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            RetailerService = (function () {
                function RetailerService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                //To query list of retailer that will be visited pertoday for user that login
                RetailerService.prototype.queryTodayCallPlan = function () {
                    var _this = this;
                    this.vIsLoading = true;
                    //To-Do : Query User ID or Username
                    var vUserId = '1';
                    var vCurrentDate = new Date();
                    console.log(vCurrentDate);
                    //Hit API with parameter user_id and current date
                    var data = 'user=' + vUserId + '&date=' + vCurrentDate;
                    this._http.post('/queryCallPlan', data, { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
                    }).subscribe(function (response) {
                        _this.vIsLoading = false;
                        if (response.json().success == 1) {
                            //Pass back the call plan result
                            return response.json().resultCallPlan;
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'Failed connecting to Retailer service';
                    });
                    return '';
                };
                RetailerService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                RetailerService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                RetailerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], RetailerService);
                return RetailerService;
            }());
            exports_1("RetailerService", RetailerService);
        }
    }
});
//# sourceMappingURL=retailer-service.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, modal_service_1, header_service_1;
    var CDTargetsActualsComponent;
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
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            CDTargetsActualsComponent = (function () {
                function CDTargetsActualsComponent(_router, _layoutService, _matchMediaService, _modalService, _headerService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('CDTargetsActuals');
                    this._headerService.setTitle("Targets & Actuals");
                }
                CDTargetsActualsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                CDTargetsActualsComponent = __decorate([
                    core_1.Component({
                        selector: 'cd-targets-actuals',
                        templateUrl: './app/close-day/components/cd-targets-actuals.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService, header_service_1.HeaderService])
                ], CDTargetsActualsComponent);
                return CDTargetsActualsComponent;
            }());
            exports_1("CDTargetsActualsComponent", CDTargetsActualsComponent);
        }
    }
});
//# sourceMappingURL=cd-targets-actuals.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, modal_service_1, header_service_1;
    var CloseDayComponent;
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
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            CloseDayComponent = (function () {
                function CloseDayComponent(_router, _layoutService, _matchMediaService, _modalService, _headerService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('CloseDay');
                    this._headerService.setTitle("Close Day");
                }
                CloseDayComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                CloseDayComponent.prototype.toggleCollection = function () {
                    this._router.navigate(['Collection']);
                };
                CloseDayComponent.prototype.goToTargetsActuals = function () {
                    console.log('TA');
                    this._router.navigate(['CDTargetsActuals']);
                };
                CloseDayComponent.prototype.goToVisitedRetailer = function () {
                    console.log('VR');
                    this._router.navigate(['VisitedRetail']);
                };
                CloseDayComponent.prototype.goToCollection = function () {
                    console.log('C');
                    this._router.navigate(['Collection']);
                };
                CloseDayComponent.prototype.goToStockReturn = function () {
                    console.log('SR');
                };
                CloseDayComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/close-day/components/close-day.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService, header_service_1.HeaderService])
                ], CloseDayComponent);
                return CloseDayComponent;
            }());
            exports_1("CloseDayComponent", CloseDayComponent);
        }
    }
});
//# sourceMappingURL=close-day.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, modal_service_1, header_service_1;
    var CollectionComponent;
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
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            CollectionComponent = (function () {
                function CollectionComponent(_router, _layoutService, _matchMediaService, _modalService, _headerService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('Collection');
                    this._headerService.setTitle("Collection");
                }
                CollectionComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                CollectionComponent = __decorate([
                    core_1.Component({
                        selector: 'collection',
                        templateUrl: './app/close-day/components/collection.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService, header_service_1.HeaderService])
                ], CollectionComponent);
                return CollectionComponent;
            }());
            exports_1("CollectionComponent", CollectionComponent);
        }
    }
});
//# sourceMappingURL=collection.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, modal_service_1, header_service_1;
    var VisitedRetailComponent;
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
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            VisitedRetailComponent = (function () {
                function VisitedRetailComponent(_router, _layoutService, _matchMediaService, _modalService, _headerService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('VisitedRetail');
                    this._headerService.setTitle("Visited Today");
                }
                VisitedRetailComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                VisitedRetailComponent = __decorate([
                    core_1.Component({
                        selector: 'visited-retail',
                        templateUrl: './app/close-day/components/visited-retail.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService, header_service_1.HeaderService])
                ], VisitedRetailComponent);
                return VisitedRetailComponent;
            }());
            exports_1("VisitedRetailComponent", VisitedRetailComponent);
        }
    }
});
//# sourceMappingURL=visited-retail.component.js.map
System.register(['angular2/core', 'angular2/router', './shared/services/match-media.service', './shared/services/layout.service', './shared/services/header.service', './shared/services/page-navigation.service', './shared/services/authentication.service', './login/components/login.component', './shared/components/header.component', './shared/components/footer-menu.component', './shared/components/main-page.component', './verification/components/verification.component', './login/components/forgot-password.component', './shared/components/modal.component', './my-transaction/components/retailer-route.component', './shared/services/modal.service', './shared/services/retailer.service', './basic-call-procedure/components/retailer-sales-order.component', './basic-call-procedure/components/detail-retailer.component', './basic-call-procedure/components/sales-order-payment.component', './shared/components/left-menu.component'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1, authentication_service_1, login_component_1, header_component_1, footer_menu_component_1, main_page_component_1, verification_component_1, forgot_password_component_1, modal_component_1, retailer_route_component_1, modal_service_1, retailer_service_1, retailer_sales_order_component_1, detail_retailer_component_1, sales_order_payment_component_1, left_menu_component_1;
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
            function (forgot_password_component_1_1) {
                forgot_password_component_1 = forgot_password_component_1_1;
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
                    var vCurrentPage = this._layoutService.getCurrentPage();
                    return !vCurrentPage || vCurrentPage === 'GetStarted' || vCurrentPage === 'Login' ||
                        vCurrentPage === 'Register';
                };
                IDSPComponent.prototype.isSmallScreen = function () {
                    return !this._matchMediaService.getMm().largeUp;
                };
                IDSPComponent = __decorate([
                    core_1.Component({
                        selector: 'idsp-app',
                        template: "\n    \t<div id=\"content\"\n            (window:resize)=\"OnResize()\">\n            <idsp-header></idsp-header>\n            <my-modal></my-modal>\n            <left-menu></left-menu>\n    \t\t<router-outlet></router-outlet>\n            <idsp-footer-menu></idsp-footer-menu>\n    \t</div>\n    ",
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
                            path: '/forgotPassword',
                            name: 'ForgotPassword',
                            component: forgot_password_component_1.ForgotPasswordComponent
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
                    __metadata('design:paramtypes', [match_media_service_1.MatchMediaService, router_1.Router, layout_service_1.LayoutService])
                ], IDSPComponent);
                return IDSPComponent;
            }());
            exports_1("IDSPComponent", IDSPComponent);
        }
    }
});
//# sourceMappingURL=idsp.component.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, match_media_service_1, layout_service_1, modal_service_1;
    var ForgotPasswordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            ForgotPasswordComponent = (function () {
                function ForgotPasswordComponent(_router, _layoutService, _matchMediaService, _modalService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._layoutService.setCurrentPage('ForgotPassword');
                }
                ForgotPasswordComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                ForgotPasswordComponent.prototype.gotoLogin = function () {
                    this._router.navigate(['Starter', 'Login']);
                };
                ForgotPasswordComponent.prototype.toggleVerificationCodeModal = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                ForgotPasswordComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/login/components/forgot-password.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService])
                ], ForgotPasswordComponent);
                return ForgotPasswordComponent;
            }());
            exports_1("ForgotPasswordComponent", ForgotPasswordComponent);
        }
    }
});
//# sourceMappingURL=forgot-password.component.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/authentication.service', '../../shared/services/layout.service'], function(exports_1, context_1) {
    'use strict';
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
    var core_1, router_1, common_1, authentication_service_1, layout_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, _layoutService, _authenticationService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._authenticationService = _authenticationService;
                    //this._layoutService.setCurrentPage('Login');
                }
                LoginComponent.prototype.login = function (pEvent) {
                    pEvent.preventDefault();
                    //For Hit API
                    //this._authenticationService.login(this.vUsername,this.vPassword);
                    //For By Pass Directly without API
                    this._router.navigate(['MainPage', 'MyTransaction']);
                };
                LoginComponent.prototype.getLoadingState = function () {
                    return this._authenticationService.getLoadingState();
                };
                LoginComponent.prototype.gotoForgetPassword = function () {
                    this._router.navigate(['ForgotPassword']);
                };
                LoginComponent.prototype.getErrorMessageText = function () {
                    return this._authenticationService.getError();
                };
                LoginComponent.prototype.gotoForgotPassword = function () {
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: './app/login/components/login.component.html',
                        directives: [
                            common_1.NgModel
                        ],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, authentication_service_1.AuthenticationService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map
System.register(['angular2/platform/browser', './idsp.component', 'angular2/core', 'angular2/http', 'angular2/router', './shared/services/my-http.service', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, idsp_component_1, core_1, http_1, http_2, router_1, my_http_service_1;
    var MyOptions, CustomBrowserXhr;
    function getPath() {
        var str = window.location.href;
        var res = str.replace("index.html", "");
        if (configChannel === 'web') {
            res = '/';
        }
        return res;
    }
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (idsp_component_1_1) {
                idsp_component_1 = idsp_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (my_http_service_1_1) {
                my_http_service_1 = my_http_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            MyOptions = (function (_super) {
                __extends(MyOptions, _super);
                function MyOptions() {
                    _super.apply(this, arguments);
                    this.headers = new http_2.Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
                    });
                }
                return MyOptions;
            }(http_1.BaseRequestOptions));
            CustomBrowserXhr = (function (_super) {
                __extends(CustomBrowserXhr, _super);
                function CustomBrowserXhr() {
                    _super.call(this);
                }
                CustomBrowserXhr.prototype.build = function () {
                    var xhr = _super.prototype.build.call(this);
                    xhr.withCredentials = true;
                    return (xhr);
                };
                CustomBrowserXhr = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CustomBrowserXhr);
                return CustomBrowserXhr;
            }(http_1.BrowserXhr));
            exports_1("CustomBrowserXhr", CustomBrowserXhr);
            core_1.enableProdMode();
            browser_1.bootstrap(idsp_component_1.IDSPComponent, [
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.APP_BASE_HREF, { useValue: getPath() }),
                http_1.HTTP_PROVIDERS,
                core_1.provide(http_1.Http, {
                    useFactory: function (xhrBackend, requestOptions, _router) {
                        var originalHttp = new http_1.Http(xhrBackend, requestOptions);
                        return new my_http_service_1.MyHttp(originalHttp, _router);
                    },
                    deps: [http_2.XHRBackend, http_1.RequestOptions, router_1.Router]
                }),
                core_1.provide(http_1.BrowserXhr, { useClass: CustomBrowserXhr })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../services/accounts-receivables-service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, accounts_receivables_service_1, common_1;
    var AccountsReceivablesComponent;
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
            function (accounts_receivables_service_1_1) {
                accounts_receivables_service_1 = accounts_receivables_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            AccountsReceivablesComponent = (function () {
                function AccountsReceivablesComponent(_layoutService, _matchMediaService, _headerService, _router, _accountsReceivablesService) {
                    var _this = this;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._accountsReceivablesService = _accountsReceivablesService;
                    this._layoutService.setCurrentPage('AccountsReceivables');
                    this._headerService.setTitle("Accounts Receivables");
                    this._accountsReceivablesService.getAllRetailer().subscribe(function (response) {
                        _this.setAllRetailerList(response.json());
                        console.log('response success');
                        console.log(response.json());
                        console.log('sukses isi vAllRetailerList: ' + _this.vAllRetailerList);
                        var x = 0;
                        console.log(response.json().length);
                        for (var i = 0; i < response.json().length; i++) {
                            console.log('amount' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].amount));
                            console.log('sequence' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.Route[0].RouteDay[0].sequence));
                            console.log('retailer_name' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.retailer_name));
                            console.log('retailer_min' + i + ' :' + JSON.stringify(response.json()[i].AccountReceivable[0].Retailer.retailer_min));
                            x = x + parseInt(response.json()[i].AccountReceivable[0].amount);
                        }
                        console.log('get sum x: ' + x);
                        _this.setTotalReceivable(x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                        _this.getAllRetailer();
                    }, function (error) {
                        console.log(error.json());
                    });
                }
                AccountsReceivablesComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                AccountsReceivablesComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                AccountsReceivablesComponent.prototype.getTotalReceivable = function () {
                    if (this.vSum == null) {
                        this.setTotalReceivable(0);
                    }
                    return this.vSum;
                };
                AccountsReceivablesComponent.prototype.setTotalReceivable = function (vTotal) {
                    this.vSum = vTotal;
                };
                AccountsReceivablesComponent.prototype.onKey = function (pInputText) {
                    console.log(pInputText);
                    this.vSearchedList = this.vAllRetailerList.filter(function (retailer) {
                        return retailer.AccountReceivable[0].Retailer.retailer_name.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                            retailer.AccountReceivable[0].Retailer.retailer_min.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
                    });
                };
                AccountsReceivablesComponent.prototype.getAllRetailer = function () {
                    this.vSearchedList = this.vAllRetailerList;
                    console.log('sukses isi vsearchlist: ' + this.vSearchedList);
                };
                AccountsReceivablesComponent.prototype.getAllRetailerList = function () {
                    return this.vAllRetailerList;
                };
                AccountsReceivablesComponent.prototype.setAllRetailerList = function (vAllRetailerList) {
                    this.vAllRetailerList = vAllRetailerList;
                };
                AccountsReceivablesComponent = __decorate([
                    core_1.Component({
                        selector: 'accounts-receivables',
                        templateUrl: './app/my-transaction/components/accounts-receivables.component.html',
                        directives: [
                            common_1.NgFor, common_1.NgModel, router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            accounts_receivables_service_1.AccountsReceivablesService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router, accounts_receivables_service_1.AccountsReceivablesService])
                ], AccountsReceivablesComponent);
                return AccountsReceivablesComponent;
            }());
            exports_1("AccountsReceivablesComponent", AccountsReceivablesComponent);
        }
    }
});
//# sourceMappingURL=accounts-receivables.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/http', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, http_1, common_1;
    var DSPAlertsComponent;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DSPAlertsComponent = (function () {
                function DSPAlertsComponent(_http, _layoutService, _matchMediaService, _headerService) {
                    this._http = _http;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('DSPAlerts');
                    this._headerService.setTitle("Alert & Threshold");
                    this.loadAlert();
                }
                DSPAlertsComponent.prototype.loadAlert = function () {
                    var _this = this;
                    this._http.get('/getRetailerAlert', null).subscribe(function (response) {
                        _this.vRetailerAlert = response.json();
                    }, function (error) {
                    });
                };
                DSPAlertsComponent.prototype.getRetailerAlert = function () {
                    return this.vRetailerAlert;
                };
                DSPAlertsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                DSPAlertsComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                DSPAlertsComponent = __decorate([
                    core_1.Component({
                        selector: 'dsp-alerts',
                        templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService])
                ], DSPAlertsComponent);
                return DSPAlertsComponent;
            }());
            exports_1("DSPAlertsComponent", DSPAlertsComponent);
        }
    }
});
//# sourceMappingURL=dsp-alerts.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common', '../../shared/services/inventory.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1, inventory_service_1;
    var InventoryComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            }],
        execute: function() {
            InventoryComponent = (function () {
                function InventoryComponent(_layoutService, _matchMediaService, _headerService, _inventoryService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._inventoryService = _inventoryService;
                    this.vLoadShow = true;
                    this.vPhysicalShow = false;
                    this.vSubPhysicalMenuShow = [];
                    this.vSubLoadMenuShow = [];
                    // this.vSelectedDate = "20160429003012";
                    this._layoutService.setCurrentPage('Inventory');
                    this._headerService.setTitle("Inventory");
                    this._inventoryService.getProductListPhysical('asdasd', 'asd');
                }
                InventoryComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                InventoryComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                InventoryComponent.prototype.showMenuLoad = function () {
                    this.vLoadShow = true;
                    this.vPhysicalShow = false;
                };
                InventoryComponent.prototype.showMenuPhysical = function () {
                    this.vLoadShow = false;
                    this.vPhysicalShow = true;
                };
                InventoryComponent.prototype.subPhysicalMenuShow = function (indexArr) {
                    console.log(indexArr);
                    this.vSubPhysicalMenuShow[indexArr] = !this.vSubPhysicalMenuShow[indexArr];
                };
                InventoryComponent.prototype.subLoadMenuShow = function (indexArr) {
                    console.log(indexArr);
                    this.vSubLoadMenuShow[indexArr] = !this.vSubLoadMenuShow[indexArr];
                };
                InventoryComponent.prototype.getProductList = function () {
                    return this._inventoryService.productList;
                };
                InventoryComponent.prototype.isProductListLoaded = function () {
                    return this._inventoryService.productListStatus;
                };
                InventoryComponent = __decorate([
                    core_1.Component({
                        selector: 'inventory',
                        templateUrl: './app/my-transaction/components/inventory.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            inventory_service_1.InventoryService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, inventory_service_1.InventoryService])
                ], InventoryComponent);
                return InventoryComponent;
            }());
            exports_1("InventoryComponent", InventoryComponent);
        }
    }
});
//# sourceMappingURL=inventory.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/page-navigation.service', 'angular2/common', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1, common_1, http_1;
    var MyTransactionComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            MyTransactionComponent = (function () {
                function MyTransactionComponent(_http, _layoutService, _matchMediaService, _headerService, _router, _pageNavigationService) {
                    this._http = _http;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._pageNavigationService = _pageNavigationService;
                    this._layoutService.setCurrentPage('MyTransaction');
                    this._headerService.setTitle("My Dashboard");
                    this.vDate = new Date();
                }
                MyTransactionComponent.prototype.test = function () {
                    var _this = this;
                    this._http.get('/check').subscribe(function (response) {
                        _this.is_loading = false;
                        console.log(response.json());
                    }, function (error) {
                        console.log(error);
                        _this.error_msg = 'failed connecting to login service';
                    });
                };
                MyTransactionComponent.prototype.getToday = function () {
                    return this.vDate;
                };
                MyTransactionComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                MyTransactionComponent.prototype.goToTargetsActuals = function () {
                    console.log('PEGI KE TARGET ACTUAL');
                    this._router.navigate(['TargetsActuals']);
                };
                MyTransactionComponent.prototype.goToInventory = function () {
                    console.log('PEGI KE INVENTORY');
                    this._router.navigate(['Inventory']);
                };
                MyTransactionComponent.prototype.goToRetailerRoute = function () {
                    console.log('PEGI KE RETAILER ROUTE');
                    this._router.navigate(['RetailerRoute']);
                };
                MyTransactionComponent.prototype.goToAccountsReceivables = function () {
                    console.log('Go to Account Receivables');
                    this._router.navigate(['AccountsReceivables']);
                };
                MyTransactionComponent.prototype.goToDSPAlerts = function () {
                    console.log('PEGI KE DSP');
                    //this._pageNavigationService.navigate('DSPAlerts' , {id : 'anjayy'});
                    this._router.navigate(['DSPAlerts']);
                };
                MyTransactionComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                MyTransactionComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/my-transaction/components/my-transaction.component.html',
                        directives: [
                            common_1.NgModel, router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router, page_navigation_service_1.PageNavigationService])
                ], MyTransactionComponent);
                return MyTransactionComponent;
            }());
            exports_1("MyTransactionComponent", MyTransactionComponent);
        }
    }
});
//# sourceMappingURL=my-transaction.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../services/retailer-route-service', '../../shared/services/page-navigation.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, retailer_route_service_1, page_navigation_service_1, common_1;
    var RetailerRouteComponent;
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
            function (retailer_route_service_1_1) {
                retailer_route_service_1 = retailer_route_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            RetailerRouteComponent = (function () {
                function RetailerRouteComponent(_layoutService, _matchMediaService, _headerService, _router, _params, _retailerRouteService, _pageNavigationService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._params = _params;
                    this._retailerRouteService = _retailerRouteService;
                    this._pageNavigationService = _pageNavigationService;
                    this.vListDay = [
                        {
                            "name": "Sunday",
                            "value": "0"
                        },
                        {
                            "name": "Monday",
                            "value": "1"
                        },
                        {
                            "name": "Tuesday",
                            "value": "2"
                        },
                        {
                            "name": "Wednesday",
                            "value": "3"
                        },
                        {
                            "name": "Thursday",
                            "value": "4"
                        },
                        {
                            "name": "Friday",
                            "value": "5"
                        },
                        {
                            "name": "Saturday",
                            "value": "6"
                        }
                    ];
                    console.log(this._pageNavigationService.getCurrentParams());
                    if (this._pageNavigationService.getCurrentParams() !== null && this._pageNavigationService.getCurrentParams() !== '') {
                        var vPreviousSelectedDay = this._pageNavigationService.getCurrentParams().selectedDay;
                        this.vSelectedDay = vPreviousSelectedDay;
                    }
                    else {
                        this.vSelectedDate = new Date();
                        this.vSelectedDay = this.vSelectedDate.getDay();
                    }
                    console.log(this.vSelectedDate);
                    this.refreshRetailerRoute();
                    this._layoutService.setCurrentPage('RetailerRoute');
                    this._headerService.setTitle("Retailer Route");
                }
                RetailerRouteComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                RetailerRouteComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                RetailerRouteComponent.prototype.refreshRetailerRoute = function () {
                    var _this = this;
                    console.log("Refresh retailer route for Day " + this.vSelectedDay);
                    this._retailerRouteService.queryRetailerRoute(this.vSelectedDay).subscribe(function (response) {
                        if (response.json().status == 'Success') {
                            console.log("Query Success");
                            _this.vListRetailers = response.json().result;
                        }
                        else {
                            console.log("Query Failed");
                        }
                    }, function (error) {
                        console.log(error);
                        //this.vErrorMsg = 'Failed connecting to login service';
                    });
                };
                RetailerRouteComponent.prototype.onChangeSelectDay = function (pSelectedDay) {
                    this.vSelectedDay = pSelectedDay;
                    this.refreshRetailerRoute();
                };
                //each.retailer_id, each.route_sequence
                //pSelectedRetailer, pRouteSequence
                RetailerRouteComponent.prototype.goToDetailRetailer = function (pSelectedRetailer) {
                    console.log(pSelectedRetailer);
                    var vParamsOld = {
                        selectedDay: this.vSelectedDay
                    };
                    var vParams = {
                        retailer_id: pSelectedRetailer.retailer_id,
                        route_sequence: pSelectedRetailer.Route[0].RouteDay[0].sequence
                    };
                    this._pageNavigationService.navigate('DetailRetailer', vParams, vParamsOld);
                    //this._router.navigate(['DetailRetailer',vParams]);
                };
                RetailerRouteComponent = __decorate([
                    core_1.Component({
                        selector: 'retailer-route',
                        templateUrl: './app/my-transaction/components/retailer-route.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            retailer_route_service_1.RetailerRouteService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router, router_1.RouteParams, retailer_route_service_1.RetailerRouteService, page_navigation_service_1.PageNavigationService])
                ], RetailerRouteComponent);
                return RetailerRouteComponent;
            }());
            exports_1("RetailerRouteComponent", RetailerRouteComponent);
        }
    }
});
//# sourceMappingURL=retailer-route.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../my-transaction/services/targets-actuals.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, targets_actuals_service_1, common_1;
    var TargetsActualsComponent;
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
            function (targets_actuals_service_1_1) {
                targets_actuals_service_1 = targets_actuals_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            TargetsActualsComponent = (function () {
                function TargetsActualsComponent(_router, _layoutService, _matchMediaService, _headerService, _targetsActualsService) {
                    var _this = this;
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._targetsActualsService = _targetsActualsService;
                    this.vDayShow = true;
                    this.vWeekShow = false;
                    this.vMonthShow = false;
                    this.vUnderlineDay = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineMonth = false;
                    this.vSelectedBrand = "SMART";
                    this._layoutService.setCurrentPage('TargetsActuals');
                    this._headerService.setTitle("Targets & Actuals");
                    this._targetsActualsService.queryBrand().subscribe(function (response) {
                        if (response.json().status == "Success") {
                            _this.vListBrands = response.json().brandList;
                        }
                    }, function (error) { });
                    this._targetsActualsService.queryProdCat().subscribe(function (response) {
                        if (response.json().status == "Success") {
                            _this.vListProd = response.json().CatList;
                            _this.vShowProd = _this.vListProd;
                        }
                    }, function (error) { });
                    this._targetsActualsService.queryProduct().subscribe(function (response) {
                        if (response.json().status == "Success") {
                            _this.vListProduct = response.json().ProdList;
                            _this.vShowProduct = _this.vListProduct.filter(function (prod) {
                                return prod.brand == _this.vSelectedBrand;
                            });
                        }
                    }, function (error) { });
                }
                TargetsActualsComponent.prototype.getBrand = function () {
                    return this.vListBrands;
                };
                TargetsActualsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                TargetsActualsComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                TargetsActualsComponent.prototype.showMenuDay = function () {
                    this.vDayShow = true;
                    this.vUnderlineDay = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineMonth = false;
                    this.vWeekShow = false;
                    this.vMonthShow = false;
                };
                TargetsActualsComponent.prototype.showMenuWeek = function () {
                    this.vWeekShow = true;
                    this.vUnderlineWeek = true;
                    this.vUnderlineDay = false;
                    this.vUnderlineMonth = false;
                    this.vDayShow = false;
                    this.vMonthShow = false;
                };
                TargetsActualsComponent.prototype.showMenuMonth = function () {
                    this.vMonthShow = true;
                    this.vUnderlineMonth = true;
                    this.vUnderlineWeek = false;
                    this.vUnderlineDay = false;
                    this.vWeekShow = false;
                    this.vDayShow = false;
                };
                TargetsActualsComponent.prototype.onChangeSelectBrand = function (pSelectedBrand) {
                    var _this = this;
                    this.vSelectedBrand = pSelectedBrand;
                    console.log(this.vSelectedBrand + " IS SELECTED");
                    this.vShowProd = this.vListProd.filter(function (prod) { return prod.brand == _this.vSelectedBrand; });
                    this.vShowProduct = this.vListProduct.filter(function (prod) { return prod.brand == _this.vSelectedBrand; });
                };
                TargetsActualsComponent.prototype.getProdCat = function () {
                    return this.vShowProd;
                };
                TargetsActualsComponent.prototype.getProduct = function () {
                    return this.vShowProduct;
                };
                TargetsActualsComponent = __decorate([
                    core_1.Component({
                        selector: 'targets-actuals',
                        templateUrl: './app/my-transaction/components/targets-actuals.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            targets_actuals_service_1.TargetsActualsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, targets_actuals_service_1.TargetsActualsService])
                ], TargetsActualsComponent);
                return TargetsActualsComponent;
            }());
            exports_1("TargetsActualsComponent", TargetsActualsComponent);
        }
    }
});
//# sourceMappingURL=targets-actuals.component.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var AccountsReceivablesService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AccountsReceivablesService = (function () {
                function AccountsReceivablesService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                AccountsReceivablesService.prototype.searchRetailer = function () {
                    console.log('test onkeypress masuk service');
                    return;
                };
                AccountsReceivablesService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                AccountsReceivablesService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                AccountsReceivablesService.prototype.getAllRetailer = function () {
                    return this._http.get('/getAccountsReceivables', null);
                };
                AccountsReceivablesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], AccountsReceivablesService);
                return AccountsReceivablesService;
            }());
            exports_1("AccountsReceivablesService", AccountsReceivablesService);
        }
    }
});
//# sourceMappingURL=accounts-receivables-service.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var RetailerRouteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            RetailerRouteService = (function () {
                function RetailerRouteService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                //To query Route for Selected Day 
                RetailerRouteService.prototype.queryRetailerRoute = function (pSelectedDay) {
                    console.log("Start hit login service to Query Retailer Route");
                    //Get Current Login User
                    var vData = {
                        salesPerson: 'DSP01',
                        day: pSelectedDay
                    };
                    var vSalesRoute;
                    //Hit Api with selectedDate and Login user
                    return this._http.post('/getSalesRoute', JSON.stringify(vData));
                    //Sample Hardcoded
                    /*
                    vSalesRoute = [
                        {
                            "retailer_id": "1",
                            "route": [{RouteDay : [{sequence: 1}]}],
                            "retailer_name": "Gloria Cell",
                            "retailer_address": "Barangka Dr. Mandaluyong",
                            "owner_name": "Ms. Gloria"
                        },
                        {
                            "retailer_id": "2",
                            "route": [{RouteDay : [{sequence: 2}]}],
                            "retailer_name": "Bird Cell",
                            "retailer_address": "Barangka Dr. Sutrisno",
                            "owner_name": "Mr. Jaja"
                        },
                        {
                            "retailer_id": "3",
                            "route": [{RouteDay : [{sequence: null}]}],
                            "retailer_name": "Rose Cell",
                            "retailer_address": "Matalang 56 Barangka",
                            "owner_name": "Ms. Rose"
                        }];
                    */
                    //console.log(vSalesRoute);	
                    //return vSalesRoute;
                };
                RetailerRouteService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                RetailerRouteService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                RetailerRouteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], RetailerRouteService);
                return RetailerRouteService;
            }());
            exports_1("RetailerRouteService", RetailerRouteService);
        }
    }
});
//# sourceMappingURL=retailer-route-service.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var TargetsActualsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            TargetsActualsService = (function () {
                function TargetsActualsService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                    this.queryBrand();
                    this.queryProdCat();
                    this.queryProdSubCat();
                    this.queryProduct();
                }
                TargetsActualsService.prototype.queryBrand = function () {
                    //this.vIsLoading = true;
                    //let vUserId:string = '1';
                    //let vCurrentDate = new Date();
                    // console.log(vCurrentDate);
                    // return this._http.get('/targetsActuals');
                    /*
                    this._http.get('/targetsActuals',
                        <RequestOptionsArgs> {headers: new Headers(
                            {'Content-Type': 'application/x-www-form-urlencoded'})
                        }).subscribe(
                            response => {
                                this.vIsLoading = false;
                                console.log(response.json());
                                if(response.json().status == "Success"){
                                    this.vBrand = response.json().brandList;
                                }else{
                                    this.vErrorMsg = response.json().error;
                                }
                            },
                            error => {
                                console.log(error);
                                this.vErrorMsg = 'Failed connecting to Retailer service';
                            }
                        );
                        */
                    /*
                    this._http.get('/targetsActuals').subscribe(
                        response => {
                            if(response.json().status == "Success"){
                                this.vBrand = response.json().brandList;
                                console.log('masukkk');
                            }else{
                                this.vErrorMsg = response.json().error;
                            }
                        },
                        error => {
                            console.log(error);
                            this.vErrorMsg = 'Failed connecting to Retailer service';
                        }
                    );
                    */
                    return this._http.get('/targetsActuals');
                };
                TargetsActualsService.prototype.queryProdCat = function () {
                    /*console.log('masuk service');
                 this._http.get('/getProductCategory').subscribe(
                        response => {
                            if(response.json().status == "Success"){
                                this.vProdCat = response.json().CatList;
                            }else{
                                this.vErrorMsg = response.json().error;
                            }
                        },
                        error => {
                            console.log(error);
                            this.vErrorMsg = 'Failed connecting to Retailer service';
                        }
                    );
        
                    return null;
                    */
                    return this._http.get('/getProductCategory');
                };
                TargetsActualsService.prototype.queryProdSubCat = function () {
                    return this._http.get('/getProductSubCategory');
                };
                TargetsActualsService.prototype.queryProduct = function () {
                    return this._http.get('/getProduct');
                };
                TargetsActualsService.prototype.queryCategory = function () {
                    return this._http.get('/getCategory');
                };
                TargetsActualsService.prototype.queryTargets = function (pSubCategoryID) {
                    //To-Do : Query User ID or Username
                    var vSubCategoryID = pSubCategoryID;
                    //Hit API with parameter user_id and current date
                    var data = 'sub_category_id=' + vSubCategoryID;
                    return this._http.post('/getTargets', data, { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
                    });
                };
                TargetsActualsService.prototype.getBrand = function () {
                    return this.vBrand;
                };
                TargetsActualsService.prototype.getProdCat = function () {
                    return this.vProdCat;
                };
                TargetsActualsService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                TargetsActualsService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                TargetsActualsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], TargetsActualsService);
                return TargetsActualsService;
            }());
            exports_1("TargetsActualsService", TargetsActualsService);
        }
    }
});
//# sourceMappingURL=targets-actuals.service.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1;
    var ResetPasswordComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ResetPasswordComponent = (function () {
                function ResetPasswordComponent(_layoutService, _router, _matchMediaService, _headerService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('ResetPassword');
                    this._headerService.setTitle("Reset Password");
                }
                ResetPasswordComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                ResetPasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'reset-password',
                        templateUrl: './app/settings/components/reset-password.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, header_service_1.HeaderService])
                ], ResetPasswordComponent);
                return ResetPasswordComponent;
            }());
            exports_1("ResetPasswordComponent", ResetPasswordComponent);
        }
    }
});
//# sourceMappingURL=reset-password.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/authentication.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/modal.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, authentication_service_1, layout_service_1, header_service_1, modal_service_1, common_1;
    var SettingsComponent;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SettingsComponent = (function () {
                function SettingsComponent(_layoutService, _router, _matchMediaService, _authenticationService, _headerService, _modalService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._authenticationService = _authenticationService;
                    this._headerService = _headerService;
                    this._modalService = _modalService;
                    this._layoutService.setCurrentPage('Settings');
                    this._headerService.setTitle('Settings');
                }
                SettingsComponent.prototype.goToResetPassword = function () {
                    console.log('RESET');
                    this._router.navigate(['ResetPassword']);
                };
                SettingsComponent.prototype.sync = function () {
                    console.log('Sync');
                    this._router.navigate(['Sync']);
                };
                SettingsComponent.prototype.toggleVerificationCodeModal = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                SettingsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                SettingsComponent.prototype.logout = function () {
                    console.log('logout');
                    this._router.parent.navigate(['Starter']);
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        templateUrl: './app/settings/components/settings.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, authentication_service_1.AuthenticationService, header_service_1.HeaderService, modal_service_1.ModalService])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map
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
                // getFooterItem(){
                // 	console.log("Footer item");
                // 	return this._layoutService.getFooterItem();
                // }
                // getFooterState(){
                // 	return this._layoutService.getFooterState();
                // }
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
System.register(['angular2/core', 'angular2/router', '../services/layout.service', '../../shared/services/match-media.service', '../../shared/services/page-navigation.service', '../../shared/services/header.service'], function(exports_1, context_1) {
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
    var core_1, router_1, layout_service_1, match_media_service_1, page_navigation_service_1, header_service_1;
    var HeaderComponent;
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
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_layoutService, _router, _matchMediaService, _pageNavigationService, _headerService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._pageNavigationService = _pageNavigationService;
                    this._headerService = _headerService;
                }
                HeaderComponent.prototype.ngOnInit = function () {
                };
                HeaderComponent.prototype.toggleLeftMenu = function () {
                    this._layoutService.toggleLeftMenu();
                };
                HeaderComponent.prototype.getTitle = function () {
                    return this._headerService.getTitle();
                };
                HeaderComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                HeaderComponent.prototype.getHeaderLayout = function () {
                    return this._layoutService.getHeaderLayout();
                };
                HeaderComponent.prototype.goToPreviousPage = function () {
                    this._pageNavigationService.gotoPreviousPage();
                };
                HeaderComponent.prototype.toggleSearch = function () {
                    this._layoutService.setSearch();
                };
                HeaderComponent.prototype.toggleFilter = function () {
                    this._layoutService.setFilter();
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'idsp-header',
                        templateUrl: 'app/shared/components/header.component.html'
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, page_navigation_service_1.PageNavigationService, header_service_1.HeaderService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/authentication.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, authentication_service_1;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }],
        execute: function() {
            LeftMenuComponent = (function () {
                function LeftMenuComponent(_layoutService, _router, _matchMediaService, _authenticationService, _headerService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._authenticationService = _authenticationService;
                    this._headerService = _headerService;
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
                    console.log(pGoToPage + " - " + this.vCurrentPage);
                    if (pGoToPage === this.vCurrentPage) {
                        this.toggleLeftMenu();
                    }
                    else {
                        this._router.navigate(['MainPage', pGoToPage]);
                    }
                };
                LeftMenuComponent.prototype.goToMyDashboard = function () {
                    this.vGoToPage = "MyTransaction";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToTargets = function () {
                    this.vGoToPage = "TargetsActuals";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToInventory = function () {
                    this.vGoToPage = "Inventory";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToRetailerRoute = function () {
                    this.vGoToPage = "RetailerRoute";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToAccountReceivables = function () {
                    this.vGoToPage = "AccountsReceivables";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToThresholdAlerts = function () {
                    this.vGoToPage = "DSPAlerts";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToBasicCallProcedure = function () {
                    this.vGoToPage = "BasicCallProcedure";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToCloseOfTheDay = function () {
                    this.vGoToPage = "CloseDay";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToTargetsActuals = function () {
                    this.vGoToPage = "CDTargetsActuals";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToVisitedRetailerRoute = function () {
                    this.vGoToPage = "VisitedRetail";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToCollection = function () {
                    this.vGoToPage = "Collection";
                    this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToRemittance = function () {
                    // this.vGoToPage = "Remittance";
                    // this.checkCurrentPage(this.vGoToPage);
                };
                LeftMenuComponent.prototype.goToStockReturn = function () {
                    // this.vGoToPage = "StockReturn";
                    // this.checkCurrentPage(this.vGoToPage);
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
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, authentication_service_1.AuthenticationService, header_service_1.HeaderService])
                ], LeftMenuComponent);
                return LeftMenuComponent;
            }());
            exports_1("LeftMenuComponent", LeftMenuComponent);
        }
    }
});
//# sourceMappingURL=left-menu.component.js.map
System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../my-transaction/components/my-transaction.component', '../../basic-call-procedure/components/basic-call-procedure.component', '../../close-day/components/close-day.component', '../../close-day/components/collection.component', '../../settings/components/settings.component', '../../my-transaction/components/targets-actuals.component', '../../my-transaction/components/inventory.component', '../../my-transaction/components/retailer-route.component', '../../my-transaction/components/accounts-receivables.component', '../../my-transaction/components/dsp-alerts.component', '../../settings/components/reset-password.component', '../../basic-call-procedure/components/retailer-sales-order.component', '../../basic-call-procedure/components/detail-retailer.component', '../../basic-call-procedure/components/retailer-inventory.component', '../../basic-call-procedure/components/sales-order-payment.component', '../../close-day/components/cd-targets-actuals.component', '../../close-day/components/visited-retail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, my_transaction_component_1, basic_call_procedure_component_1, close_day_component_1, collection_component_1, settings_component_1, targets_actuals_component_1, inventory_component_1, retailer_route_component_1, accounts_receivables_component_1, dsp_alerts_component_1, reset_password_component_1, retailer_sales_order_component_1, detail_retailer_component_1, retailer_inventory_component_1, sales_order_payment_component_1, cd_targets_actuals_component_1, visited_retail_component_1;
    var MainPageComponent;
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
            function (my_transaction_component_1_1) {
                my_transaction_component_1 = my_transaction_component_1_1;
            },
            function (basic_call_procedure_component_1_1) {
                basic_call_procedure_component_1 = basic_call_procedure_component_1_1;
            },
            function (close_day_component_1_1) {
                close_day_component_1 = close_day_component_1_1;
            },
            function (collection_component_1_1) {
                collection_component_1 = collection_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (targets_actuals_component_1_1) {
                targets_actuals_component_1 = targets_actuals_component_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            },
            function (retailer_route_component_1_1) {
                retailer_route_component_1 = retailer_route_component_1_1;
            },
            function (accounts_receivables_component_1_1) {
                accounts_receivables_component_1 = accounts_receivables_component_1_1;
            },
            function (dsp_alerts_component_1_1) {
                dsp_alerts_component_1 = dsp_alerts_component_1_1;
            },
            function (reset_password_component_1_1) {
                reset_password_component_1 = reset_password_component_1_1;
            },
            function (retailer_sales_order_component_1_1) {
                retailer_sales_order_component_1 = retailer_sales_order_component_1_1;
            },
            function (detail_retailer_component_1_1) {
                detail_retailer_component_1 = detail_retailer_component_1_1;
            },
            function (retailer_inventory_component_1_1) {
                retailer_inventory_component_1 = retailer_inventory_component_1_1;
            },
            function (sales_order_payment_component_1_1) {
                sales_order_payment_component_1 = sales_order_payment_component_1_1;
            },
            function (cd_targets_actuals_component_1_1) {
                cd_targets_actuals_component_1 = cd_targets_actuals_component_1_1;
            },
            function (visited_retail_component_1_1) {
                visited_retail_component_1 = visited_retail_component_1_1;
            }],
        execute: function() {
            MainPageComponent = (function () {
                function MainPageComponent(_layoutService, _matchMediaService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                }
                MainPageComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                MainPageComponent = __decorate([
                    core_1.Component({
                        selector: 'main-page',
                        templateUrl: './app/shared/components/main-page.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: []
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/myTransaction',
                            name: 'MyTransaction',
                            component: my_transaction_component_1.MyTransactionComponent
                        },
                        {
                            path: '/basicCallProcedure',
                            name: 'BasicCallProcedure',
                            component: basic_call_procedure_component_1.BasicCallProcedureComponent
                        },
                        {
                            path: '/closeDay',
                            name: 'CloseDay',
                            component: close_day_component_1.CloseDayComponent
                        },
                        {
                            path: '/settings',
                            name: 'Settings',
                            component: settings_component_1.SettingsComponent
                        },
                        //UNDER MY TRANSACTION TAB - START
                        {
                            path: '/targetsActuals',
                            name: 'TargetsActuals',
                            component: targets_actuals_component_1.TargetsActualsComponent
                        },
                        {
                            path: '/inventory',
                            name: 'Inventory',
                            component: inventory_component_1.InventoryComponent
                        },
                        {
                            path: '/retailerRoute',
                            name: 'RetailerRoute',
                            component: retailer_route_component_1.RetailerRouteComponent
                        },
                        {
                            path: '/accountsReceivables',
                            name: 'AccountsReceivables',
                            component: accounts_receivables_component_1.AccountsReceivablesComponent
                        },
                        {
                            path: '/dspAlerts',
                            name: 'DSPAlerts',
                            component: dsp_alerts_component_1.DSPAlertsComponent
                        },
                        //UNDER MY TRANSACTION TAB - END
                        //UNDER BCP TAB - START
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
                            path: '/retailerInventory',
                            name: 'RetailerInventory',
                            component: retailer_inventory_component_1.RetailerInventoryComponent
                        },
                        {
                            path: '/salesOrderPayment',
                            name: 'SalesOrderPayment',
                            component: sales_order_payment_component_1.SalesOrderPaymentComponent
                        },
                        //UNDER BCP TAB - END
                        //UNDER CLOSE DAY TAB - START
                        {
                            path: '/collection',
                            name: 'Collection',
                            component: collection_component_1.CollectionComponent
                        },
                        {
                            path: '/closeDayTargetsActuals',
                            name: 'CDTargetsActuals',
                            component: cd_targets_actuals_component_1.CDTargetsActualsComponent
                        },
                        {
                            path: '/visitedRetail',
                            name: 'VisitedRetail',
                            component: visited_retail_component_1.VisitedRetailComponent
                        },
                        //UNDER SETTINGS TAB - END
                        //UNDER SETTINGS TAB - START
                        {
                            path: '/resetPassword',
                            name: 'ResetPassword',
                            component: reset_password_component_1.ResetPasswordComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService])
                ], MainPageComponent);
                return MainPageComponent;
            }());
            exports_1("MainPageComponent", MainPageComponent);
        }
    }
});
//# sourceMappingURL=main-page.component.js.map
System.register(['angular2/core', '../../services/modal.service'], function(exports_1, context_1) {
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
    var core_1, modal_service_1;
    var VerificationCodeModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            VerificationCodeModalComponent = (function () {
                function VerificationCodeModalComponent(_modalService) {
                    this._modalService = _modalService;
                }
                VerificationCodeModalComponent.prototype.close = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                VerificationCodeModalComponent = __decorate([
                    core_1.Component({
                        selector: 'verification-code-modal',
                        templateUrl: 'app/shared/components/modal-includes/verification-code-modal.component.html'
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], VerificationCodeModalComponent);
                return VerificationCodeModalComponent;
            }());
            exports_1("VerificationCodeModalComponent", VerificationCodeModalComponent);
        }
    }
});
//# sourceMappingURL=verification-code-modal.component.js.map
System.register(['angular2/core', './modal-includes/verification-code-modal.component', '../services/modal.service'], function(exports_1, context_1) {
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
    var core_1, verification_code_modal_component_1, modal_service_1;
    var ModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (verification_code_modal_component_1_1) {
                verification_code_modal_component_1 = verification_code_modal_component_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            ModalComponent = (function () {
                function ModalComponent(_modalService) {
                    this._modalService = _modalService;
                }
                ModalComponent.prototype.getModalStatus = function () {
                    return this._modalService.getModalState();
                };
                ModalComponent.prototype.getMainModalStatus = function () {
                    return this._modalService.getMainModalState();
                };
                ModalComponent = __decorate([
                    core_1.Component({
                        selector: 'my-modal',
                        templateUrl: 'app/shared/components/modal.component.html',
                        directives: [
                            verification_code_modal_component_1.VerificationCodeModalComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], ModalComponent);
                return ModalComponent;
            }());
            exports_1("ModalComponent", ModalComponent);
        }
    }
});
//# sourceMappingURL=modal.component.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var AuthenticationService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AuthenticationService = (function () {
                function AuthenticationService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                AuthenticationService.prototype.login = function (pUsername, pPassword) {
                    if (!this.loginValidation(pUsername, pPassword)) {
                        this.vErrorMsg = 'Invalid username or password';
                    }
                    else {
                        this.vIsLoading = true;
                        this.loginService(pUsername, pPassword);
                    }
                };
                AuthenticationService.prototype.autoLogin = function () {
                    var _this = this;
                    this._http.get('/verifyToken', { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
                    }).subscribe(function (response) {
                        _this.vIsLoading = false;
                        if (response.json().success == 1) {
                            //set token to local storage(mobile)
                            //this._router.navigate(['MyTransaction']);
                            _this._router.navigate(['MainPage', 'MyTransaction']);
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'failed connecting to login service';
                    });
                };
                AuthenticationService.prototype.loginValidation = function (pUsername, pPassword) {
                    console.log("Start validate user and password " + pUsername + " : " + pPassword);
                    if (pUsername == null || pUsername == "")
                        return false;
                    if (pPassword == null || pPassword == "")
                        return false;
                    return true;
                };
                AuthenticationService.prototype.loginService = function (pUsername, pPassword) {
                    var _this = this;
                    console.log("Start hit login service");
                    var vData = {
                        username: pUsername,
                        password: pPassword
                    };
                    this._http.post('/login', JSON.stringify(vData)).subscribe(function (response) {
                        if (response.json().success == 1) {
                            //set token to local storage(mobile)
                            localStorage.setItem('accessToken', response.json().token);
                            console.log("Login Sukses with token " + response.json().token);
                            //this._router.navigate(['MyTransaction']);
                            _this._router.navigate(['MainPage', 'MyTransaction']);
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'failed connecting to login service';
                    });
                    return false;
                };
                AuthenticationService.prototype.logout = function () {
                    this._http.get('/logout').subscribe(function (response) {
                        if (response.json().success == 1) {
                            //remove token of mobile device
                            localStorage.removeItem('accessToken');
                        }
                        else {
                            console.log(response.json().error);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    this._router.navigate(['Starter']);
                };
                AuthenticationService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                AuthenticationService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map
System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var HeaderService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HeaderService = (function () {
                function HeaderService() {
                }
                HeaderService.prototype.setHeaderCaption = function (pCaption) {
                    this.vHeaderCaption = pCaption;
                };
                HeaderService.prototype.getHeaderCaption = function () {
                    return this.vHeaderCaption;
                };
                HeaderService.prototype.setTitle = function (pTitle) {
                    this.vTitle = pTitle;
                };
                HeaderService.prototype.getTitle = function () {
                    return this.vTitle;
                };
                HeaderService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], HeaderService);
                return HeaderService;
            }());
            exports_1("HeaderService", HeaderService);
        }
    }
});
//# sourceMappingURL=header.service.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var InventoryService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            InventoryService = (function () {
                function InventoryService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.productListStatus = false;
                }
                InventoryService.prototype.getProductList = function (pUsername, pDate) {
                    this.getProductListPhysical(pUsername, pDate);
                };
                InventoryService.prototype.getProductListPhysical = function (pUsername, pDate) {
                    var _this = this;
                    console.log("Start hit inventory service");
                    var vData = {
                        username: pUsername,
                        date: pDate
                    };
                    this.productListStatus = false;
                    this._http.get('/getProductListPhysical').subscribe(function (response) {
                        console.log("response get" + response.json().status);
                        if (response.json().status === "SUCCESS") {
                            console.log("masuk success");
                            console.log("1 : " + JSON.stringify(response.json()));
                            console.log("2 : " + JSON.stringify(response.json().status));
                            console.log("3 : " + JSON.stringify(response.json().statusMessage));
                            console.log("4 : " + JSON.stringify(response.json().productList));
                            _this.productList = response.json().productList;
                        }
                        else {
                            _this.vErrorMsg = response.json().statusMessage;
                        }
                        _this.productListStatus = true;
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'failed connecting to inventory service';
                        return null;
                    });
                    return null;
                };
                InventoryService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], InventoryService);
                return InventoryService;
            }());
            exports_1("InventoryService", InventoryService);
        }
    }
});
//# sourceMappingURL=inventory.service.js.map
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
                    //Unused
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
                // getFooterState(){
                //     return this.vFooterState;
                // }
                //getFooterLayout(){
                //    return this.vFooterItem;
                //}
                LayoutService.prototype.getOldCurrentPage = function () {
                    return this.vOldCurrentPage;
                };
                LayoutService.prototype.setOldCurrentPage = function (pCurrentPage) {
                    this._pageNavigationService.addListPreviousData(pCurrentPage, null);
                    this.vOldCurrentPage = pCurrentPage;
                };
                /*
                    setOldCurrentPageData(pCurrentPage : string, pParams){
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
                // getFooterItem(){
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
                    if (pCurrent == 'GetStarted' ||
                        pCurrent == 'Verification' ||
                        pCurrent == 'Login') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vLayoutState = {
                            appHeader: false,
                            appFooter: false,
                            leftMenu: false
                        };
                    }
                    else if (pCurrent == 'MyTransaction' ||
                        pCurrent == 'BasicCallProcedure' ||
                        pCurrent == 'CloseDay' ||
                        pCurrent == 'Remittance' ||
                        pCurrent == 'StockReturn') {
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
                    else if (pCurrent == 'TargetsActuals' ||
                        pCurrent == 'Inventory' ||
                        pCurrent == 'RetailerRoute' ||
                        pCurrent == 'AccountsReceivables' ||
                        pCurrent == 'DSPAlerts') {
                        //this._pageNavigationService.setPreviousPage('MyTransaction');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "MyTransaction";
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
                    else if (pCurrent == 'Collection' ||
                        pCurrent == 'StockReturn' ||
                        pCurrent == 'Sync') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
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
                    else if (pCurrent == 'ResetPassword') {
                        //this._pageNavigationService.setPreviousPage('Settings');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "Settings";
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
                    else if (pCurrent == 'RetailerSalesOrder'
                        || pCurrent == 'SalesOrderPayment') {
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "BasicCallProcedure";
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
                    else if (pCurrent == 'DetailRetailer'
                        || pCurrent == 'RetailerInventory') {
                        // NO NEED TO SET THE PREVIOUS PAGE SINCE IT CAN COMES FROM MULTIPLE VIEW
                        //this._pageNavigationService.setPreviousPage("BasicCallProcedure");
                        //if(this.vOldCurrentPage!==null || this.vOldCurrentPage!==""){
                        //    this._pageNavigationService.setPreviousPage(this.vOldCurrentPage);
                        //}
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
                    else if (pCurrent == 'CDTargetsActuals') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
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
                    else if (pCurrent == 'VisitedRetail') {
                        //this._pageNavigationService.setPreviousPage('CloseDay');
                        this._pageNavigationService.resetListPreviousData();
                        this.vOldCurrentPage = "CloseDay";
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
                    console.log("In Layout Current Page " + pCurrent);
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
                    //FOR LOGOUT ONLY
                    this.vLayoutState.appHeader = false;
                };
                LayoutService.prototype.getLeftMenuState = function () {
                    return this.vLayoutState.leftMenu;
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
System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var MatchMediaService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MatchMediaService = (function () {
                function MatchMediaService() {
                    this.vRules = {
                        print: "print",
                        screen: "screen",
                        small: "(max-width: 640px)",
                        medium: "(min-width: 640px) and (max-width: 1024px)",
                        large: "(min-width: 1024px)",
                        xlarge: "(min-width: 1920px)",
                        portrait: "(orientation: portrait)",
                        landscape: "(orientation: landscape)"
                    };
                    this.vMmqry = {
                        print: false,
                        screen: false,
                        small: false,
                        medium: false,
                        large: false,
                        xlarge: false,
                        portrait: false,
                        landscape: false,
                        largeUp: false,
                        mediumUp: false
                    };
                }
                MatchMediaService.prototype.OnResize = function () {
                    // get media query
                    for (this.vKey in this.vRules) {
                        if (this.vRules.hasOwnProperty(this.vKey)) {
                            this.vMmqry[this.vKey] = window.matchMedia(this.vRules[this.vKey]).matches;
                        }
                    }
                    if (this.vMmqry.large || this.vMmqry.xlarge) {
                        this.vMmqry.largeUp = true;
                    }
                    else {
                        this.vMmqry.largeUp = false;
                    }
                    if (this.vMmqry.medium || this.vMmqry.large || this.vMmqry.xlarge) {
                        this.vMmqry.mediumUp = true;
                    }
                    else {
                        this.vMmqry.mediumUp = false;
                    }
                };
                MatchMediaService.prototype.getMm = function () {
                    return this.vMmqry;
                };
                MatchMediaService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MatchMediaService);
                return MatchMediaService;
            }());
            exports_1("MatchMediaService", MatchMediaService);
        }
    }
});
//# sourceMappingURL=match-media.service.js.map
System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ModalService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ModalService = (function () {
                function ModalService() {
                    this.vMainModalState = false;
                    this.vModalState = {
                        info: false,
                        verificationCode: false,
                        collection: false
                    };
                }
                ModalService.prototype.getMainModalState = function () {
                    return this.vMainModalState;
                };
                ModalService.prototype.getModalState = function () {
                    return this.vModalState;
                };
                ModalService.prototype.toggleVerificationCodeModal = function () {
                    if (this.vMainModalState) {
                        this.refreshModal();
                    }
                    else {
                        this.vModalState.verificationCode = !this.vModalState.verificationCode;
                    }
                    this.vMainModalState = !this.vMainModalState;
                };
                ModalService.prototype.toggleCollectionModal = function () {
                    if (this.vMainModalState) {
                        this.refreshModal();
                    }
                    else {
                        this.vModalState.collection = !this.vModalState.collection;
                    }
                    this.vMainModalState = !this.vMainModalState;
                };
                ModalService.prototype.refreshModal = function () {
                    this.vModalState.info = false;
                    this.vModalState.collection = false;
                    this.vModalState.verificationCode = false;
                };
                ModalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ModalService);
                return ModalService;
            }());
            exports_1("ModalService", ModalService);
        }
    }
});
//# sourceMappingURL=modal.service.js.map
System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, router_1;
    var MyHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            MyHttp = (function () {
                function MyHttp(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vServiceBaseUrl = '';
                    /* Read Config
                    const URL = 'config/service.json';
                    this.vServiceBaseUrl = '';
                    this._http.get(URL,
                        <RequestOptionsArgs> {
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded',
                            })
                        })
                       .subscribe(file => {
                           let vConfig = file.json();
                           this.vServiceBaseUrl = vConfig.baseUrl;
                           this.vTimeout = Number(vConfig.timeout);
                               
                       });
                    */
                }
                MyHttp.prototype.get = function (pUrl, pOptions) {
                    return this._request(http_1.RequestMethod.Get, pUrl, null, pOptions);
                };
                MyHttp.prototype.post = function (pUrl, pBody, pOptions) {
                    return this._request(http_1.RequestMethod.Post, pUrl, pBody, pOptions);
                };
                MyHttp.prototype.put = function (pUrl, pBody, pOptions) {
                    return this._request(http_1.RequestMethod.Put, pUrl, pBody, pOptions);
                };
                MyHttp.prototype.delete = function (pUrl, pOptions) {
                    return this._request(http_1.RequestMethod.Delete, pUrl, null, pOptions);
                };
                MyHttp.prototype._createAuthHeaders = function (pMethod) {
                    var vHeaders = new http_1.Headers();
                    if (pMethod != http_1.RequestMethod.Get) {
                        vHeaders.append('Content-Type', 'application/json');
                    }
                    if (configChannel !== 'web') {
                        var vAccessToken = localStorage.getItem('accessToken');
                        if (vAccessToken) {
                            vHeaders.append('Authorization', 'Bearer ' + vAccessToken);
                        }
                    }
                    return vHeaders;
                };
                MyHttp.prototype._request = function (pMethod, pUrl, pBody, pOptions) {
                    var _this = this;
                    var vRequestOptions = new http_1.RequestOptions({
                        method: pMethod,
                        body: pBody
                    });
                    //using custom options
                    if (pOptions) {
                        for (var vAttrname in pOptions) {
                            vRequestOptions[vAttrname] = pOptions[vAttrname];
                        }
                    }
                    else {
                        vRequestOptions.headers = this._createAuthHeaders(pMethod);
                    }
                    ;
                    return Observable_1.Observable.create(function (pObserver) {
                        var CONFIG_URL = 'config/service.json';
                        if (_this.vServiceBaseUrl === '') {
                            _this._http.get(CONFIG_URL, {
                                headers: new http_1.Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                })
                            })
                                .subscribe(function (file) {
                                var vConfig = file.json();
                                _this.vServiceBaseUrl = vConfig.baseUrl;
                                _this.vTimeout = Number(vConfig.timeout);
                                vRequestOptions.url = _this.vServiceBaseUrl + pUrl;
                                console.log("Start request to " + _this.vServiceBaseUrl + pUrl);
                                _this.executeRequest(pObserver, vRequestOptions);
                            });
                        }
                        else {
                            vRequestOptions.url = _this.vServiceBaseUrl + pUrl;
                            _this.executeRequest(pObserver, vRequestOptions);
                        }
                    });
                };
                MyHttp.prototype.executeRequest = function (pObserver, pOpt) {
                    this._http.request(new http_1.Request(pOpt))
                        .timeout(this.vTimeout, { status: 408 })
                        .subscribe(function (res) {
                        pObserver.next(res);
                        pObserver.complete();
                    }, function (err) {
                        switch (err.status) {
                            case 403:
                                pObserver.error(err);
                                break;
                            default:
                                pObserver.error(err);
                                break;
                        }
                    });
                };
                MyHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], MyHttp);
                return MyHttp;
            }());
            exports_1("MyHttp", MyHttp);
        }
    }
});
//# sourceMappingURL=my-http.service.js.map
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
                        console.log("Total Previous Page " + this.vListPreviousData.length);
                        var vPreviousData = this.getLatestPreviousData();
                        console.log("Previous data adalah " + JSON.stringify(vPreviousData));
                        vPreviousPage = vPreviousData.page;
                        vPreviousParams = vPreviousData.param;
                    }
                    else {
                        vPreviousPage = this.vCurrentPage;
                        vPreviousParams = null;
                    }
                    if (this.vChildNode == 'login') {
                        this._router.navigate(['Starter', vPreviousPage]);
                    }
                    else {
                        if (vPreviousParams !== null && vPreviousParams !== '') {
                            console.log("params is found" + vPreviousParams);
                        }
                        this.vCurrentParams = vPreviousParams;
                        this._router.navigate(['MainPage', vPreviousPage]);
                    }
                };
                PageNavigationService.prototype.navigate = function (pNewPage, pNewParams, pOldParams) {
                    console.log("Mau pindah page dari : " + this.vCurrentPage + " ke " + pNewPage);
                    this.addListPreviousData(this.vCurrentPage, pOldParams);
                    if (pNewParams) {
                        this.vCurrentParams = pNewParams;
                    }
                    else {
                        this.vCurrentParams = null;
                    }
                    this.vCurrentPage = pNewPage;
                    console.log("Ready to navigate to " + pNewPage);
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
System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var RetailerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            RetailerService = (function () {
                function RetailerService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                RetailerService.prototype.getRetailerSummary = function (pRetailerID) {
                    console.log("Start hit login service to Query Retailer Summary");
                    //Get Current Login User
                    var vData = {
                        retailerId: pRetailerID
                    };
                    //Hit Api with selectedDate and Login user
                    return this._http.post('/getRetailerSummary', JSON.stringify(vData));
                    /*Sample Hardcoded
                    var vSampleObject;
                    if (pRetailerID == 1)
                    {
                        vSampleObject =
                        {
                            "retailer_id": "1",
                            "retailer_name": "Gloria Cell",
                            "retailer_min": "2931791239",
                            "owner_first_name": 'Ms. Gloria',
                            "owner_middle_name": '',
                            "owner_last_name": '',
                            "retailer_address": "Barangka Dr. Mandaluyong",
                            "civil_status": 'WNI',
                            "email": 'GLORIAR@GMAIL.COM',
                            "gender": 'Female',
                            "birthday": new Date(),
                            "amount_receivable": 1000000,
                            "value_segment": "High",
                            "threshold": 100000
                        };
                    }
                    else if (pRetailerID == 2)
                    {
                        vSampleObject =
                        {
                            "retailer_id": "2",
                            "retailer_name": "Bird Cell",
                            "retailer_min": "2931791239",
                            "owner_first_name": 'Ms. Jaja',
                            "owner_middle_name": '',
                            "owner_last_name": '',
                            "retailer_address": "Barangka Dr. Sutrisno",
                            "civil_status": 'WNI',
                            "email": 'JAJA@GMAIL.COM',
                            "gender": 'Male',
                            "birthday": new Date(),
                            "amount_receivable": 2000000,
                            "value_segment": "Medium",
                            "threshold": 500000
                        };
                    }
                    else if (pRetailerID == 3)
                    {
                        vSampleObject =
                        {
                            "retailer_id": "3",
                            "retailer_name": "Rose Cell",
                            "retailer_min": "1231312311",
                            "owner_first_name": 'Rose Cell',
                            "owner_middle_name": '',
                            "owner_last_name": '',
                            "retailer_address": "Matalang 56 Barangka",
                            "civil_status": 'WNI',
                            "email": 'ROSE@GMAIL.COM',
                            "gender": 'Female',
                            "birthday": new Date(),
                            "amount_receivable": 3000000,
                            "value_segment": "Low",
                            "threshold": 700000
                        };
                    }
                                
                    return vSampleObject;
                    */
                };
                RetailerService.prototype.getRetailer = function (pRetailerID) {
                    /*
                    let vData:string = 'retailerID='+pRetailerID;
                    this._http.post('/testQueryRetailer',vData,
                        <RequestOptionsArgs> {headers: new Headers(
                            {'Content-Type': 'application/x-www-form-urlencoded'})
                        }).subscribe(
                            response => {
                                this.vIsLoading = false;
                                if(response.json().success == 1){//success login
                                    //set token to local storage(mobile)
                                    //localStorage.setItem('accessToken', response.json().token);
                                    console.log( response.json().res);
                                    this.vRetailer = response.json().res;
            
                                }else{//failed login
                                    this.vErrorMsg = response.json().error;
                                }
                            },
                            error => {
                                console.log(error);
                                this.vErrorMsg = 'failed connecting DB';
                            }
                        );
                    return false;
                    */
                };
                RetailerService.prototype.getRetailerAll = function () {
                    return this.vRetailer;
                };
                RetailerService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                RetailerService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                RetailerService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], RetailerService);
                return RetailerService;
            }());
            exports_1("RetailerService", RetailerService);
        }
    }
});
//# sourceMappingURL=retailer.service.js.map
System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/authentication.service', '../../shared/services/layout.service'], function(exports_1, context_1) {
    'use strict';
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
    var core_1, router_1, common_1, authentication_service_1, layout_service_1;
    var VerificationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            }],
        execute: function() {
            VerificationComponent = (function () {
                function VerificationComponent(_router, _layoutService, _authenticationService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._authenticationService = _authenticationService;
                    this._layoutService.setCurrentPage('AuthLogin');
                }
                VerificationComponent.prototype.login = function (pEvent) {
                    pEvent.preventDefault();
                    this._authenticationService.login(this.vUserId, this.vPassword);
                    this._router.navigate(['MyTransaction']);
                };
                VerificationComponent.prototype.getErrorMessageText = function () {
                    return "Error Bro";
                };
                VerificationComponent = __decorate([
                    core_1.Component({
                        selector: 'verification',
                        templateUrl: './app/verification/components/verification.component.html',
                        directives: [
                            common_1.NgModel
                        ],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, authentication_service_1.AuthenticationService])
                ], VerificationComponent);
                return VerificationComponent;
            }());
            exports_1("VerificationComponent", VerificationComponent);
        }
    }
});
//# sourceMappingURL=verification.component.js.map