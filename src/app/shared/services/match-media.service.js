"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('angular2/core');
var MatchMediaService = (function () {
    function MatchMediaService() {
        this.rules = {
            print: "print",
            screen: "screen",
            small: "(max-width: 640px)",
            medium: "(min-width: 640px) and (max-width: 1024px)",
            large: "(min-width: 1024px)",
            xlarge: "(min-width: 1920px)",
            portrait: "(orientation: portrait)",
            landscape: "(orientation: landscape)"
        };
        this.mmqry = {
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
        for (this.key in this.rules) {
            if (this.rules.hasOwnProperty(this.key)) {
                this.mmqry[this.key] = window.matchMedia(this.rules[this.key]).matches;
            }
        }
        if (this.mmqry.large || this.mmqry.xlarge) {
            this.mmqry.largeUp = true;
        }
        else {
            this.mmqry.largeUp = false;
        }
        if (this.mmqry.medium || this.mmqry.large || this.mmqry.xlarge) {
            this.mmqry.mediumUp = true;
        }
        else {
            this.mmqry.mediumUp = false;
        }
    };
    MatchMediaService.prototype.getmm = function () {
        return this.mmqry;
    };
    MatchMediaService = __decorate([
        core_1.Injectable()
    ], MatchMediaService);
    return MatchMediaService;
}());
exports.MatchMediaService = MatchMediaService;
