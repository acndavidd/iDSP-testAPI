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
                    console.log('Start hit inventory service');
                    var vData = {
                        username: pUsername,
                        date: pDate
                    };
                    this.productListStatus = false;
                    this._http.get('/getProductListPhysical').subscribe(function (response) {
                        console.log('response get' + response.json().status);
                        if (response.json().status === 'SUCCESS') {
                            console.log('masuk success');
                            console.log('1: ' + JSON.stringify(response.json()));
                            console.log('2: ' + JSON.stringify(response.json().status));
                            console.log('3: ' + JSON.stringify(response.json().statusMessage));
                            console.log('4: ' + JSON.stringify(response.json().productList));
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