System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/authentication.service', '../../shared/services/layout.service'], function(exports_1, context_1) {
    'use strict';
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
    var core_1, router_1, common_1, authentication_service_1, layout_service_1;
    var VerificationComponent;
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
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            },
            function (layout_service_1_1) {
                layout_service_1 = layout_service_1_1;
            }],
        execute: function() {
            VerificationComponent = (function () {
                function VerificationComponent(_router, _layoutService, _authenticationService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._authenticationService = _authenticationService;
                    this._layoutService.setCurrentPage('AuthLogin');
                }
                VerificationComponent.prototype.login = function (pEvent) {
                    pEvent.preventDefault();
                    this._authenticationService.login(this.vUserId, this.vPassword);
                    this._router.navigate(['MyTransaction']);
                };
                VerificationComponent.prototype.getErrorMessageText = function () {
                    return "Error Bro";
                };
                VerificationComponent = __decorate([
                    core_1.Component({
                        selector: 'verification',
                        templateUrl: './app/verification/components/verification.component.html',
                        directives: [
                            common_1.NgModel
                        ],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, authentication_service_1.AuthenticationService])
                ], VerificationComponent);
                return VerificationComponent;
            }());
            exports_1("VerificationComponent", VerificationComponent);
        }
    }
});
//# sourceMappingURL=verification.component.js.map