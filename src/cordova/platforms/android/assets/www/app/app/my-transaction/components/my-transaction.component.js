System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/page-navigation.service', 'angular2/common', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1, common_1, http_1;
    var MyTransactionComponent;
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
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            MyTransactionComponent = (function () {
                function MyTransactionComponent(_http, _layoutService, _matchMediaService, _headerService, _router, _pageNavigationService) {
                    this._http = _http;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._router = _router;
                    this._pageNavigationService = _pageNavigationService;
                    this._layoutService.setCurrentPage('MyTransaction');
                    this._headerService.setTitle("My Transaction");
                }
                MyTransactionComponent.prototype.test = function () {
                    var _this = this;
                    this._http.get('/check').subscribe(function (response) {
                        _this.is_loading = false;
                        console.log(response.json());
                    }, function (error) {
                        console.log(error);
                        _this.error_msg = 'failed connecting to login service';
                    });
                };
                MyTransactionComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                MyTransactionComponent.prototype.goToTargetsActuals = function () {
                    console.log('PEGI KE TARGET ACTUAL');
                    this._router.navigate(['TargetsActuals']);
                };
                MyTransactionComponent.prototype.goToInventory = function () {
                    console.log('PEGI KE INVENTORY');
                    this._router.navigate(['Inventory']);
                };
                MyTransactionComponent.prototype.goToRetailerRoute = function () {
                    console.log('PEGI KE RETAILER ROUTE');
                    this._router.navigate(['RetailerRoute']);
                };
                MyTransactionComponent.prototype.goToAccountsReceivables = function () {
                    console.log('Go to Account Receivables');
                    this._router.navigate(['AccountsReceivables']);
                };
                MyTransactionComponent.prototype.goToDSPAlerts = function () {
                    console.log('PEGI KE DSP');
                    this._pageNavigationService.navigate('DSPAlerts', { id: 'anjayy' });
                    //this._router.navigate(['DSPAlerts']);
                };
                MyTransactionComponent.prototype.getLayout = function () {
                    return this._layoutService.getLayout();
                };
                MyTransactionComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/my-transaction/components/my-transaction.component.html',
                        directives: [
                            common_1.NgModel, router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, router_1.Router, page_navigation_service_1.PageNavigationService])
                ], MyTransactionComponent);
                return MyTransactionComponent;
            }());
            exports_1("MyTransactionComponent", MyTransactionComponent);
        }
    }
});
//# sourceMappingURL=my-transaction.component.js.map