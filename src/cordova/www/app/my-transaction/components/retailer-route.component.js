System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/retailer.service', '../../shared/services/page-navigation.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, retailer_service_1, page_navigation_service_1, common_1;
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
            function (retailer_service_1_1) {
                retailer_service_1 = retailer_service_1_1;
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            RetailerRouteComponent = (function () {
                function RetailerRouteComponent(_layoutService, _matchMediaService, _headerService, _router, _params, _retailerService, _pageNavigationService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._params = _params;
                    this._retailerService = _retailerService;
                    this._pageNavigationService = _pageNavigationService;
                    this.vListDay = [
                        {
                            'name': 'Sunday',
                            'value': '0'
                        },
                        {
                            'name': 'Monday',
                            'value': '1'
                        },
                        {
                            'name': 'Tuesday',
                            'value': '2'
                        },
                        {
                            'name': 'Wednesday',
                            'value': '3'
                        },
                        {
                            'name': 'Thursday',
                            'value': '4'
                        },
                        {
                            'name': 'Friday',
                            'value': '5'
                        },
                        {
                            'name': 'Saturday',
                            'value': '6'
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
                    this._headerService.setTitle('Retailer Route');
                }
                RetailerRouteComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                RetailerRouteComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                RetailerRouteComponent.prototype.refreshRetailerRoute = function () {
                    var _this = this;
                    console.log('Refresh retailer route for Day ' + this.vSelectedDay);
                    this._retailerService.queryRetailerRoute(this.vSelectedDay).subscribe(function (response) {
                        console.log('Hasil response ' + response.json());
                        if (response.json().status === 'Success') {
                            console.log('Query Success');
                            _this.vListRetailers = response.json().result;
                        }
                        else {
                            _this.vListRetailers = null;
                            console.log('Query Failed');
                        }
                    }, function (error) {
                        console.log(error);
                        // this.vErrorMsg = 'Failed connecting to login service';
                    });
                };
                RetailerRouteComponent.prototype.onChangeSelectDay = function (pSelectedDay) {
                    this.vSelectedDay = pSelectedDay;
                    this.refreshRetailerRoute();
                };
                // each.retailer_id, each.route_sequence
                // pSelectedRetailer, pRouteSequence
                RetailerRouteComponent.prototype.goToDetailRetailer = function (pSelectedRetailer) {
                    console.log(pSelectedRetailer);
                    var vParamsOld = {
                        selectedDay: this.vSelectedDay
                    };
                    var vParams = {
                        retailer_id: pSelectedRetailer.retailer_id,
                        route_sequence: pSelectedRetailer.seq
                    };
                    this._pageNavigationService.navigate('DetailRetailer', vParams, vParamsOld);
                    // this._router.navigate(['DetailRetailer',vParams]);
                };
                RetailerRouteComponent = __decorate([
                    core_1.Component({
                        selector: 'retailer-route',
                        templateUrl: './app/my-transaction/components/hc-retailer-route.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            retailer_service_1.RetailerService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router, router_1.RouteParams, retailer_service_1.RetailerService, page_navigation_service_1.PageNavigationService])
                ], RetailerRouteComponent);
                return RetailerRouteComponent;
            }());
            exports_1("RetailerRouteComponent", RetailerRouteComponent);
        }
    }
});
//# sourceMappingURL=retailer-route.component.js.map