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
                }
                TargetsActualsService.prototype.queryBrand = function () {
                    // this.vIsLoading = true;
                    // let vUserId: string = '1';
                    // let vCurrentDate = new Date();
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
                                if(response.json().status == "Success") {
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
                                if(response.json().status == "Success") {
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
                    /* console.log('masuk service');
                     this._http.get('/getProductCategory').subscribe(
                          response => {
                                if(response.json().status == "Success") {
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
                TargetsActualsService.prototype.queryProduct = function (pSelectedTab, pSelectedBrand) {
                    console.log('Start hit login service to Query Product');
                    console.log('selecteddd' + pSelectedTab);
                    // Get Current Login User
                    var vData = {
                        salesPerson: 'DSP00001',
                        actualType: pSelectedTab,
                        brand: pSelectedBrand
                    };
                    return this._http.post('/getProduct', JSON.stringify(vData));
                };
                TargetsActualsService.prototype.queryCategory = function () {
                    return this._http.get('/getCategory');
                };
                TargetsActualsService.prototype.queryTargets = function (pSubCategoryID) {
                    // To-Do : Query User ID or Username
                    var vSubCategoryID = pSubCategoryID;
                    // Hit API with parameter user_id and current date
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