"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var AuthenticationService = (function () {
    function AuthenticationService(_http) {
        this._http = _http;
        this.service_url = 'http://127.0.0.1:8080/api';
    }
    AuthenticationService.prototype.login = function (username, password) {
        console.log(username + '   ' + password);
        if (!this.loginValidation(username, password)) {
            this.error_msg = 'Invalid username or password';
        }
        else {
            console.log('call login service');
            this.loginService(username, password);
        }
    };
    AuthenticationService.prototype.loginValidation = function (username, password) {
        if (username == null || username == "")
            return false;
        if (password == null || password == "")
            return false;
        return true;
    };
    AuthenticationService.prototype.loginService = function (username, password) {
        this.service_url += '/login';
        var data = 'username=' + username + '&password=';
        this._http.post(this.service_url, data, { headers: new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
        }).subscribe(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
        return false;
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
