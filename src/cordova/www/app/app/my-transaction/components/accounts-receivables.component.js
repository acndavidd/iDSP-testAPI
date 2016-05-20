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
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._accountsReceivablesService = _accountsReceivablesService;
                    this.vAllRetailerList = [];
                    this.vSearchedList = [];
                    this._layoutService.setCurrentPage('AccountsReceivables');
                    this._headerService.setTitle("Accounts Receivables");
                }
                AccountsReceivablesComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                AccountsReceivablesComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                AccountsReceivablesComponent.prototype.getSearchRetailer = function () {
                    this.setTotalReceivable('35000');
                };
                AccountsReceivablesComponent.prototype.getTotalReceivable = function () {
                    return this._accountsReceivablesService.getTotalReceivable();
                };
                AccountsReceivablesComponent.prototype.setTotalReceivable = function (pTotal) {
                    this.vTotal = pTotal;
                };
                AccountsReceivablesComponent.prototype.onKey = function (pInputText) {
                    console.log(pInputText);
                    this.vSearchedList = this.vAllRetailerList.filter(function (retailer) {
                        return retailer.retailerName.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1 ||
                            retailer.MIN.toLowerCase().indexOf(pInputText.toLowerCase()) !== -1;
                    });
                };
                AccountsReceivablesComponent.prototype.getAllRetailer = function () {
                    this.vAllRetailerList = this._accountsReceivablesService.getAllRetailer();
                    this.vSearchedList = this.vAllRetailerList;
                    console.log(this.vAllRetailerList);
                };
                AccountsReceivablesComponent.prototype.ngOnInit = function () {
                    this.getAllRetailer();
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