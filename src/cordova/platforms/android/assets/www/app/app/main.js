System.register(['angular2/platform/browser', './idsp.component', 'angular2/core', 'angular2/http', 'angular2/router', './shared/services/my-http.service', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, idsp_component_1, core_1, http_1, http_2, router_1, my_http_service_1;
    var MyOptions, CustomBrowserXhr;
    function getPath() {
        var str = window.location.href;
        var res = str.replace("index.html", "");
        if (configChannel === 'web') {
            res = '/';
        }
        return res;
    }
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (idsp_component_1_1) {
                idsp_component_1 = idsp_component_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (my_http_service_1_1) {
                my_http_service_1 = my_http_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            MyOptions = (function (_super) {
                __extends(MyOptions, _super);
                function MyOptions() {
                    _super.apply(this, arguments);
                    this.headers = new http_2.Headers({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
                    });
                }
                return MyOptions;
            }(http_1.BaseRequestOptions));
            CustomBrowserXhr = (function (_super) {
                __extends(CustomBrowserXhr, _super);
                function CustomBrowserXhr() {
                    _super.call(this);
                }
                CustomBrowserXhr.prototype.build = function () {
                    var xhr = _super.prototype.build.call(this);
                    xhr.withCredentials = true;
                    return (xhr);
                };
                CustomBrowserXhr = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], CustomBrowserXhr);
                return CustomBrowserXhr;
            }(http_1.BrowserXhr));
            exports_1("CustomBrowserXhr", CustomBrowserXhr);
            core_1.enableProdMode();
            browser_1.bootstrap(idsp_component_1.IDSPComponent, [
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                router_1.ROUTER_PROVIDERS,
                core_1.provide(router_1.APP_BASE_HREF, { useValue: getPath() }),
                http_1.HTTP_PROVIDERS,
                core_1.provide(http_1.Http, {
                    useFactory: function (xhrBackend, requestOptions, _router) {
                        var originalHttp = new http_1.Http(xhrBackend, requestOptions);
                        return new my_http_service_1.MyHttp(originalHttp, _router);
                    },
                    deps: [http_2.XHRBackend, http_1.RequestOptions, router_1.Router]
                }),
                core_1.provide(http_1.BrowserXhr, { useClass: CustomBrowserXhr })
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map