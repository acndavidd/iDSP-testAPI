System.register(['../../shared/services/header.service', 'angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/modal.service'], function(exports_1, context_1) {
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
    var header_service_1, core_1, router_1, match_media_service_1, layout_service_1, modal_service_1;
    var CloseDayComponent;
    return {
        setters:[
            function (header_service_1_1) {
                header_service_1 = header_service_1_1;
            },
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
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            CloseDayComponent = (function () {
                function CloseDayComponent(_router, _layoutService, _matchMediaService, _modalService, _headerService) {
                    this._router = _router;
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._modalService = _modalService;
                    this._headerService = _headerService;
                    this._layoutService.setCurrentPage('CloseDay');
                    this._headerService.setTitle('Close of The Day');
                }
                CloseDayComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                CloseDayComponent.prototype.goToTargetsActuals = function () {
                    console.log('TA');
                    this._router.navigate(['CDTargetsActuals']);
                };
                CloseDayComponent.prototype.goToVisitedRetailer = function () {
                    console.log('VR');
                    this._router.navigate(['VisitedRetail']);
                };
                CloseDayComponent.prototype.goToCollection = function () {
                    console.log('C');
                    this._router.navigate(['Collection']);
                };
                CloseDayComponent.prototype.getToday = function () {
                    return this.vDate;
                };
                CloseDayComponent = __decorate([
                    core_1.Component({
                        templateUrl: './app/close-day/components/close-day.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, layout_service_1.LayoutService, match_media_service_1.MatchMediaService, modal_service_1.ModalService, header_service_1.HeaderService])
                ], CloseDayComponent);
                return CloseDayComponent;
            }());
            exports_1("CloseDayComponent", CloseDayComponent);
        }
    }
});
//# sourceMappingURL=close-day.component.js.map