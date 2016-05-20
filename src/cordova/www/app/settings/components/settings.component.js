System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/authentication.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/modal.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, authentication_service_1, layout_service_1, header_service_1, modal_service_1, common_1;
    var SettingsComponent;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            },
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            SettingsComponent = (function () {
                function SettingsComponent(_layoutService, _router, _matchMediaService, _authenticationService, _headerService, _modalService) {
                    this._layoutService = _layoutService;
                    this._router = _router;
                    this._matchMediaService = _matchMediaService;
                    this._authenticationService = _authenticationService;
                    this._headerService = _headerService;
                    this._modalService = _modalService;
                    this._layoutService.setCurrentPage('Settings');
                    this._headerService.setTitle('Settings');
                }
                SettingsComponent.prototype.goToResetPassword = function () {
                    console.log('RESET');
                    this._router.navigate(['ResetPassword']);
                };
                SettingsComponent.prototype.sync = function () {
                    console.log('Sync');
                    this._router.navigate(['Sync']);
                };
                SettingsComponent.prototype.toggleVerificationCodeModal = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                SettingsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                SettingsComponent.prototype.logout = function () {
                    console.log('logout');
                    this._router.parent.navigate(['Starter']);
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'settings',
                        templateUrl: './app/settings/components/settings.component.html',
                        directives: [
                            common_1.NgModel
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, router_1.Router, match_media_service_1.MatchMediaService, authentication_service_1.AuthenticationService, header_service_1.HeaderService, modal_service_1.ModalService])
                ], SettingsComponent);
                return SettingsComponent;
            }());
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map