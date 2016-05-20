System.register(['angular2/core', 'angular2/router', 'angular2/http', '../../../../api//services/orm.service'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, orm_service_1;
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
            },
            function (orm_service_1_1) {
                orm_service_1 = orm_service_1_1;
            }],
        execute: function() {
            AccountsReceivablesService = (function () {
                function AccountsReceivablesService(_http, _router, _ormService) {
                    this._http = _http;
                    this._router = _router;
                    this._ormService = _ormService;
                    this.arrayResult = [];
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
                AccountsReceivablesService.prototype.getTotalReceivable = function () {
                    return '35,000';
                };
                AccountsReceivablesService.prototype.getAllRetailer = function () {
                    /*return [
                     {"routeID": 1, "retailerName": "Bird Cell", "MIN": "999999902","accReceivables": 3000},
                     {"routeID": 2, "retailerName": "Rose Cell", "MIN": "999999903","accReceivables": 2000},
                     {"routeID": 3, "retailerName": "ABC Cell", "MIN": "999999904","accReceivables": 1400},
                     {"routeID": 4, "retailerName": "Lova Cell", "MIN": "999999905","accReceivables": 6000},
                     {"routeID": 5, "retailerName": "Mar Cell", "MIN": "999999906","accReceivables": 1000}
                   ];*/
                    console.log('test model');
                    this.arrayResult = this._ormService.getModel("trx_account_receivable");
                    for (var i = this.arrayResult.length - 1; i >= 0; i--) {
                        console.log(this.arrayResult.indexOf(i));
                    }
                };
                AccountsReceivablesService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router, orm_service_1.ORMService])
                ], AccountsReceivablesService);
                return AccountsReceivablesService;
            }());
            exports_1("AccountsReceivablesService", AccountsReceivablesService);
        }
    }
});
//# sourceMappingURL=accounts-receivables-service.js.map