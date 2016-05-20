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
                //To query list of 
                RetailerRouteService.prototype.queryRetailerRoute = function (pSelectedDate) {
                    //Get Current Login User
                    //Hit Api with selectedDate and Login user
                    //Sample Hardcoded
                    var vSampleObject = [
                        {
                            "retailer_id": "1",
                            "route_sequence": "1",
                            "retailer_name": "Gloria Cell",
                            "retailer_address": "Barangka Dr. Mandaluyong",
                            "owner_name": "Ms. Gloria"
                        },
                        {
                            "retailer_id": "2",
                            "route_sequence": "2",
                            "retailer_name": "Bird Cell",
                            "retailer_address": "Barangka Dr. Sutrisno",
                            "owner_name": "Mr. Jaja"
                        },
                        {
                            "retailer_id": "3",
                            "route_sequence": null,
                            "retailer_name": "Rose Cell",
                            "retailer_address": "Matalang 56 Barangka",
                            "owner_name": "Ms. Rose"
                        }];
                    return vSampleObject;
                };
                //To query list of retailer that will be visited pertoday for user that login
                RetailerRouteService.prototype.queryTodayCallPlan = function () {
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