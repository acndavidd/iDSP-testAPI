System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var MatchMediaService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MatchMediaService = (function () {
                function MatchMediaService() {
                    this.vRules = {
                        print: 'print',
                        screen: 'screen',
                        small: '(max-width: 640px)',
                        medium: '(min-width: 640px) and (max-width: 1024px)',
                        large: '(min-width: 1024px)',
                        xlarge: '(min-width: 1920px)',
                        portrait: '(orientation: portrait)',
                        landscape: '(orientation: landscape)'
                    };
                    this.vMmqry = {
                        print: false,
                        screen: false,
                        small: false,
                        medium: false,
                        large: false,
                        xlarge: false,
                        portrait: false,
                        landscape: false,
                        largeUp: false,
                        mediumUp: false
                    };
                }
                MatchMediaService.prototype.OnResize = function () {
                    // get media query
                    for (this.vKey in this.vRules) {
                        if (this.vRules.hasOwnProperty(this.vKey)) {
                            this.vMmqry[this.vKey] = window.matchMedia(this.vRules[this.vKey]).matches;
                        }
                    }
                    if (this.vMmqry.large || this.vMmqry.xlarge) {
                        this.vMmqry.largeUp = true;
                    }
                    else {
                        this.vMmqry.largeUp = false;
                    }
                    if (this.vMmqry.medium || this.vMmqry.large || this.vMmqry.xlarge) {
                        this.vMmqry.mediumUp = true;
                    }
                    else {
                        this.vMmqry.mediumUp = false;
                    }
                };
                MatchMediaService.prototype.getMm = function () {
                    return this.vMmqry;
                };
                MatchMediaService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], MatchMediaService);
                return MatchMediaService;
            }());
            exports_1("MatchMediaService", MatchMediaService);
        }
    }
});
//# sourceMappingURL=match-media.service.js.map