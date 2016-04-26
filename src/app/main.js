"use strict";
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
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var idsp_component_1 = require('./idsp.component');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var http_2 = require("angular2/http");
var router_1 = require('angular2/router');
var my_http_service_1 = require('./shared/services/my-http.service');
require('rxjs/Rx');
var MyOptions = (function (_super) {
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
var CustomBrowserXhr = (function (_super) {
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
        core_1.Injectable()
    ], CustomBrowserXhr);
    return CustomBrowserXhr;
}(http_1.BrowserXhr));
exports.CustomBrowserXhr = CustomBrowserXhr;
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
function getPath() {
    console.log(window.location.href);
    var str = window.location.href;
    var res = str.replace("index.html", "");
    if (configChannel === 'web') {
        res = '/';
    }
    console.log(res);
    return res;
}
