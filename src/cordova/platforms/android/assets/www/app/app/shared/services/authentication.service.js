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
    var AuthenticationService;
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
            AuthenticationService = (function () {
                function AuthenticationService(_http, _router) {
                    this._http = _http;
                    this._router = _router;
                    this.vIsLoading = false;
                }
                AuthenticationService.prototype.login = function (pUsername, pPassword) {
                    if (!this.loginValidation(pUsername, pPassword)) {
                        this.vErrorMsg = 'Invalid username or password';
                    }
                    else {
                        this.vIsLoading = true;
                        this.loginService(pUsername, pPassword);
                    }
                };
                AuthenticationService.prototype.autoLogin = function () {
                    var _this = this;
                    this._http.get('/verifyToken', { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
                    }).subscribe(function (response) {
                        _this.vIsLoading = false;
                        if (response.json().success == 1) {
                            //set token to local storage(mobile)
                            //this._router.navigate(['MyTransaction']);
                            _this._router.navigate(['MainPage', 'MyTransaction']);
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'failed connecting to login service';
                    });
                };
                AuthenticationService.prototype.loginValidation = function (pUsername, pPassword) {
                    console.log("Start validate user and password " + pUsername + " : " + pPassword);
                    if (pUsername == null || pUsername == "")
                        return false;
                    if (pPassword == null || pPassword == "")
                        return false;
                    return true;
                };
                AuthenticationService.prototype.loginService = function (pUsername, pPassword) {
                    var _this = this;
                    console.log("Start hit login service");
                    var vData = {
                        username: pUsername,
                        password: pPassword
                    };
                    this._http.post('/login', JSON.stringify(vData)).subscribe(function (response) {
                        if (response.json().success == 1) {
                            //set token to local storage(mobile)
                            localStorage.setItem('accessToken', response.json().token);
                            console.log("Login Sukses with token " + response.json().token);
                            //this._router.navigate(['MyTransaction']);
                            _this._router.navigate(['MainPage', 'MyTransaction']);
                        }
                        else {
                            _this.vErrorMsg = response.json().error;
                        }
                    }, function (error) {
                        console.log(error);
                        _this.vErrorMsg = 'failed connecting to login service';
                    });
                    return false;
                };
                AuthenticationService.prototype.logout = function () {
                    this._http.get('/logout').subscribe(function (response) {
                        if (response.json().success == 1) {
                            //remove token of mobile device
                            localStorage.removeItem('accessToken');
                        }
                        else {
                            console.log(response.json().error);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                    this._router.navigate(['Starter']);
                };
                AuthenticationService.prototype.getError = function () {
                    return this.vErrorMsg;
                };
                AuthenticationService.prototype.getLoadingState = function () {
                    return this.vIsLoading;
                };
                AuthenticationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], AuthenticationService);
                return AuthenticationService;
            }());
            exports_1("AuthenticationService", AuthenticationService);
        }
    }
});
//# sourceMappingURL=authentication.service.js.map