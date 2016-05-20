System.register(['angular2/core', 'angular2/router', 'angular2/common', '../../shared/services/authentication.service', '../../shared/services/layout.service', '../../shared/services/page-navigation.service', '../../shared/services/modal.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, authentication_service_1, layout_service_1, page_navigation_service_1, modal_service_1;
    var MpinComponent;
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
            },
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            MpinComponent = (function () {
                function MpinComponent(_router, _layoutService, _authenticationService, _modalService, _pageNavigationService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._authenticationService = _authenticationService;
                    this._modalService = _modalService;
                    this._pageNavigationService = _pageNavigationService;
                    this._layoutService.setCurrentPage('Mpin');
                }
                MpinComponent.prototype.cancel = function (pEvent) {
                    pEvent.preventDefault();
                    // For By Pass Directly without API
                    this._router.navigate(['Starter']);
                };
                MpinComponent.prototype.submit = function (pEvent) {
                    pEvent.preventDefault();
                    // For By Pass Directly without API
                    this._pageNavigationService.navigate('Home', null, null);
                };
                MpinComponent.prototype.ResendMpinModalComponent = function () {
                    console.log('masuk com ts');
                    this._modalService.toggleResendMpinModal();
                };
                MpinComponent = __decorate([
                    core_1.Component({
                        selector: 'mpin',
                        templateUrl: './app/login/components/mpin.component.html',
                        directives: [
                            common_1.NgModel
                        ],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, authentication_service_1.AuthenticationService, modal_service_1.ModalService, page_navigation_service_1.PageNavigationService])
                ], MpinComponent);
                return MpinComponent;
            }());
            exports_1("MpinComponent", MpinComponent);
        }
    }
});
//# sourceMappingURL=mpin.component.js.map