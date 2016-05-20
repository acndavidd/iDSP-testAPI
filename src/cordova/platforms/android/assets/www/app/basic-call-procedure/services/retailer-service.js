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
                // To query list of retailer that will be visited pertoday for user that login
                RetailerService.prototype.queryTodayCallPlan = function () {
                    var _this = this;
                    this.vIsLoading = true;
                    // To-Do : Query User ID or Username
                    var vUserId = '1';
                    var vCurrentDate = new Date();
                    console.log(vCurrentDate);
                    // Hit API with parameter user_id and current date
                    var data = 'user=' + vUserId + '&date=' + vCurrentDate;
                    this._http.post('/queryCallPlan', data, { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
                    }).subscribe(function (response) {
                        _this.vIsLoading = false;
                        if (response.json().success === 1) {
                            // Pass back the call plan result
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