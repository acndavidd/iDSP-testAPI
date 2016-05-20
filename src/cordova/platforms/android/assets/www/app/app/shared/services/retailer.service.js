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
                RetailerService.prototype.getRetailerDetail = function (pRetailerID) {
                    //Sample Hardcoded
                    var vSampleObject;
                    if (pRetailerID == 1) {
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
                    else if (pRetailerID == 2) {
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
                    else if (pRetailerID == 3) {
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