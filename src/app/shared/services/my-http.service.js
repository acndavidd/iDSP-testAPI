"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Observable_1 = require('rxjs/Observable');
var MyHttp = (function () {
    function MyHttp(_http, _router) {
        var _this = this;
        this._http = _http;
        this._router = _router;
        var url = 'services/api.json';
        this._http.get(url, {
            headers: new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        })
            .subscribe(function (file) {
            var config = file.json().config;
            _this.serviceBase = config.baseUrl;
            _this.timeout = Number(config.timeout);
        });
    }
    MyHttp.prototype.get = function (url, options) {
        return this._request(http_1.RequestMethod.Get, url, null, options);
    };
    MyHttp.prototype.post = function (url, body, options) {
        return this._request(http_1.RequestMethod.Post, url, body, options);
    };
    MyHttp.prototype.put = function (url, body, options) {
        return this._request(http_1.RequestMethod.Put, url, body, options);
    };
    MyHttp.prototype.delete = function (url, options) {
        return this._request(http_1.RequestMethod.Delete, url, null, options);
    };
    MyHttp.prototype._createAuthHeaders = function (method) {
        var headers = new http_1.Headers();
        if (method != http_1.RequestMethod.Get) {
            headers.append('Content-Type', 'application/json');
        }
        if (configChannel !== 'web') {
            var accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                headers.append('Authorization', 'Bearer ' + accessToken);
            }
        }
        return headers;
    };
    MyHttp.prototype._request = function (method, url, body, options) {
        var _this = this;
        var requestOptions = new http_1.RequestOptions({
            method: method,
            url: url,
            body: body
        });
        if (options) {
            for (var attrname in options) {
                requestOptions[attrname] = options[attrname];
            }
        }
        else {
            requestOptions.headers = this._createAuthHeaders(method);
        }
        return Observable_1.Observable.create(function (observer) {
            _this._http.request(new http_1.Request(requestOptions))
                .timeout(_this.timeout, { status: 408 })
                .subscribe(function (res) {
                observer.next(res);
                observer.complete();
            }, function (err) {
                switch (err.status) {
                    case 403:
                        console.log('forbidden');
                        var refreshToken = localStorage.getItem('refreshToken');
                        var url_1 = _this.serviceBase + '/token/renew';
                        if (refreshToken) {
                            var data = {
                                "refreshToken": refreshToken
                            };
                            _this._http.post(url_1, JSON.stringify(data))
                                .timeout(_this.timeout, { status: 408 })
                                .subscribe(function (response) {
                                localStorage.setItem('accessToken', response.json().accessToken);
                                // do original call
                                return Observable_1.Observable.create(function (observer) {
                                    _this._http.request(new http_1.Request(requestOptions))
                                        .timeout(_this.timeout, { status: 408 })
                                        .subscribe(function (res) {
                                        console.log('retry success');
                                        observer.next(res);
                                        observer.complete();
                                    }, function (err) {
                                        console.log('retry failed');
                                        observer.error(err);
                                    });
                                });
                            }, function (error) {
                                localStorage.removeItem('accessToken');
                                localStorage.removeItem('refreshToken');
                                _this._router.navigate(['Starter', 'Login']); // router might not work, need more tests		
                            });
                        }
                        observer.error(err);
                        break;
                    default:
                        observer.error(err);
                        break;
                }
            });
        });
    };
    MyHttp = __decorate([
        core_1.Injectable()
    ], MyHttp);
    return MyHttp;
}());
exports.MyHttp = MyHttp;
