System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1;
    var ResetPasswordComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            ResetPasswordComponent = (function () {
                function ResetPasswordComponent(_layoutService, _router, _matchMediaService, _headerService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('ResetPassword');
                    this._headerService.setTitle("Reset Password");
                }
                ResetPasswordComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                ResetPasswordComponent = __decorate([
                    core_1.Component({
                        selector: 'reset-password',
                        templateUrl: './app/settings/components/reset-password.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, header_service_1.HeaderService])
                ], ResetPasswordComponent);
                return ResetPasswordComponent;
            }());
            exports_1("ResetPasswordComponent", ResetPasswordComponent);
        }
    }
});
//# sourceMappingURL=reset-password.component.js.map