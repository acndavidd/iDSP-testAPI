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
                    var _this = this;
                    this._http.get('/targetsActuals').subscribe(function (response) {
                        if (response.json().status == "Success") {
                            _this.vBrand = response.json().brandList;
                            console.log('masukkk');
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'Failed connecting to Retailer service';
                    });
                    return null;
                };
                TargetsActualsService.prototype.querySubCategory = function () {
                    var _this = this;
                    this._http.get('/getProductCategory').subscribe(function (response) {
                        if (response.json().status == "Success") {
                            _this.vProdCat = response.json().CatList;
                            console.log('masukkk');
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'Failed connecting to Retailer service';
                    });
                    return null;
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