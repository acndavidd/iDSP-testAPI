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
                // To query Route for Selected Day 
                RetailerRouteService.prototype.queryRetailerRoute = function (pSelectedDay) {
                    console.log('Start hit login service to Query Retailer Route');
                    // Get Current Login User
                    var vData = {
                        salesPerson: 'DSP01',
                        day: pSelectedDay
                    };
                    var vSalesRoute;
                    // Hit Api with selectedDate and Login user
                    return this._http.post('/getSalesRoute', JSON.stringify(vData));
                    // Sample Hardcoded
                    /*
                    vSalesRoute = [
                        {
                            'retailer_id': '1',
                            'route': [{RouteDay: [{sequence: 1}]}],
                            'retailer_name': 'Gloria Cell',
                            'retailer_address': 'Barangka Dr. Mandaluyong',
                            'owner_name': 'Ms. Gloria'
                        },
                        {
                            'retailer_id': '2',
                            'route': [{RouteDay: [{sequence: 2}]}],
                            'retailer_name': 'Bird Cell',
                            'retailer_address': 'Barangka Dr. Sutrisno',
                            'owner_name': 'Mr. Jaja'
                        },
                        {
                            'retailer_id': '3',
                            'route': [{RouteDay: [{sequence: null}]}],
                            'retailer_name': 'Rose Cell',
                            'retailer_address': 'Matalang 56 Barangka',
                            'owner_name': 'Ms. Rose'
                        }];
                    */
                    // console.log(vSalesRoute); 
                    // return vSalesRoute;
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