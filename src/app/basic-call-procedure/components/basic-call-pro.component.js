"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var BasicCallProcedureComponent = (function () {
    function BasicCallProcedureComponent(_layoutService, _matchMediaService) {
        this._layoutService = _layoutService;
        this._matchMediaService = _matchMediaService;
        this._layoutService.setCurrentPage('BasicCallProcedure');
    }
    BasicCallProcedureComponent.prototype.getResize = function () {
        return this._matchMediaService.getmm();
    };
    BasicCallProcedureComponent = __decorate([
        core_1.Component({
            templateUrl: './app/basic-call-procedure/components/basic-call-pro.component.html',
            directives: [
                router_1.ROUTER_DIRECTIVES
            ]
        })
    ], BasicCallProcedureComponent);
    return BasicCallProcedureComponent;
}());
exports.BasicCallProcedureComponent = BasicCallProcedureComponent;
