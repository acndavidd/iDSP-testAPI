System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, router_1;
    var MyHttp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            MyHttp = (function () {
                function MyHttp(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vServiceBaseUrl = '';
                    /* Read Config
                    const URL = 'config/service.json';
                    this.vServiceBaseUrl = '';
                    this._http.get(URL,
                        <RequestOptionsArgs> {
                            headers: new Headers({
                                'Content-Type': 'application/x-www-form-urlencoded',
                            })
                        })
                       .subscribe(file => {
                           let vConfig = file.json();
                           this.vServiceBaseUrl = vConfig.baseUrl;
                           this.vTimeout = Number(vConfig.timeout);
                               
                       });
                    */
                }
                MyHttp.prototype.get = function (pUrl, pOptions) {
                    return this._request(http_1.RequestMethod.Get, pUrl, null, pOptions);
                };
                MyHttp.prototype.post = function (pUrl, pBody, pOptions) {
                    return this._request(http_1.RequestMethod.Post, pUrl, pBody, pOptions);
                };
                MyHttp.prototype.put = function (pUrl, pBody, pOptions) {
                    return this._request(http_1.RequestMethod.Put, pUrl, pBody, pOptions);
                };
                MyHttp.prototype.delete = function (pUrl, pOptions) {
                    return this._request(http_1.RequestMethod.Delete, pUrl, null, pOptions);
                };
                MyHttp.prototype._createAuthHeaders = function (pMethod) {
                    var vHeaders = new http_1.Headers();
                    if (pMethod != http_1.RequestMethod.Get) {
                        vHeaders.append('Content-Type', 'application/json');
                    }
                    if (configChannel !== 'web') {
                        var vAccessToken = localStorage.getItem('accessToken');
                        if (vAccessToken) {
                            vHeaders.append('Authorization', 'Bearer ' + vAccessToken);
                        }
                    }
                    return vHeaders;
                };
                MyHttp.prototype._request = function (pMethod, pUrl, pBody, pOptions) {
                    var _this = this;
                    var vRequestOptions = new http_1.RequestOptions({
                        method: pMethod,
                        body: pBody
                    });
                    //using custom options
                    if (pOptions) {
                        for (var vAttrname in pOptions) {
                            vRequestOptions[vAttrname] = pOptions[vAttrname];
                        }
                    }
                    else {
                        vRequestOptions.headers = this._createAuthHeaders(pMethod);
                    }
                    ;
                    return Observable_1.Observable.create(function (pObserver) {
                        var CONFIG_URL = 'config/service.json';
                        if (_this.vServiceBaseUrl === '') {
                            _this._http.get(CONFIG_URL, {
                                headers: new http_1.Headers({
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                })
                            })
                                .subscribe(function (file) {
                                var vConfig = file.json();
                                _this.vServiceBaseUrl = vConfig.baseUrl;
                                _this.vTimeout = Number(vConfig.timeout);
                                vRequestOptions.url = _this.vServiceBaseUrl + pUrl;
                                console.log("Start request to " + _this.vServiceBaseUrl + pUrl);
                                _this.executeRequest(pObserver, vRequestOptions);
                            });
                        }
                        else {
                            vRequestOptions.url = _this.vServiceBaseUrl + pUrl;
                            _this.executeRequest(pObserver, vRequestOptions);
                        }
                    });
                };
                MyHttp.prototype.executeRequest = function (pObserver, pOpt) {
                    this._http.request(new http_1.Request(pOpt))
                        .timeout(this.vTimeout, { status: 408 })
                        .subscribe(function (res) {
                        pObserver.next(res);
                        pObserver.complete();
                    }, function (err) {
                        switch (err.status) {
                            case 403:
                                pObserver.error(err);
                                break;
                            default:
                                pObserver.error(err);
                                break;
                        }
                    });
                };
                MyHttp = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], MyHttp);
                return MyHttp;
            }());
            exports_1("MyHttp", MyHttp);
        }
    }
});
//# sourceMappingURL=my-http.service.js.map