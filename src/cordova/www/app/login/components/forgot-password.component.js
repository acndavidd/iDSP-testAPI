System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, match_media_service_1, layout_service_1, modal_service_1;
    var ForgotPasswordComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (match_media_service_1_1) {
                match_media_service_1 = match_media_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            ForgotPasswordComponent = (function () {
                function ForgotPasswordComponent(_router, _layoutService, _matchMediaService, _modalService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._layoutService.setCurrentPage('ForgotPassword');
                }
                ForgotPasswordComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                ForgotPasswordComponent.prototype.gotoLogin = function () {
                    this._router.navigate(['Starter', 'Login']);
                };
                ForgotPasswordComponent.prototype.toggleVerificationCodeModal = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                ForgotPasswordComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/login/components/forgot-password.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService])
                ], ForgotPasswordComponent);
                return ForgotPasswordComponent;
            }());
            exports_1("ForgotPasswordComponent", ForgotPasswordComponent);
        }
    }
});
//# sourceMappingURL=forgot-password.component.js.map