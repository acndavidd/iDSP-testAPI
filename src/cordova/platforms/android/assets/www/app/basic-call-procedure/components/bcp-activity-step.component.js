System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../../shared/services/page-navigation.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, page_navigation_service_1;
    var BCPActivityStepComponent;
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
            function (page_navigation_service_1_1) {
                page_navigation_service_1 = page_navigation_service_1_1;
            }],
        execute: function() {
            BCPActivityStepComponent = (function () {
                function BCPActivityStepComponent(_layoutService, _matchMediaService, _headerService, _pageNavigationService, _router) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._pageNavigationService = _pageNavigationService;
                    this._router = _router;
                    this.vCollectionFlag = false;
                    this.vOffersFlag = false;
                    this.vSalesFlag = false;
                    this._layoutService.setCurrentPage('BCPActivityStep');
                    this._headerService.setTitle('BCP Activities Step');
                    this.vCurrentPointer = this._layoutService.getCurrentPointer();
                    this.changeCollectionColor();
                    this.changeOffersColor();
                    this.changeSalesColor();
                }
                BCPActivityStepComponent.prototype.gotoBCPCollection = function () {
                    console.log('Go to Collection');
                    if (this.vCurrentPointer === '1') {
                        this._pageNavigationService.navigate('BCPCollection', null, null);
                    }
                    else if (this.vCurrentPointer === '2') {
                        this._pageNavigationService.navigate('Offer', null, null);
                    }
                    else if (this.vCurrentPointer === '3') {
                        this._pageNavigationService.navigate('RetailerSalesOrder', null, null);
                    }
                };
                BCPActivityStepComponent.prototype.changeCollectionColor = function () {
                    if (this.vCurrentPointer === '2') {
                        this.vCollectionFlag = true;
                        this.vOffersFlag = false;
                        this.vSalesFlag = false;
                    }
                };
                BCPActivityStepComponent.prototype.changeOffersColor = function () {
                    if (this.vCurrentPointer === '3') {
                        this.vCollectionFlag = true;
                        this.vOffersFlag = true;
                        this.vSalesFlag = false;
                    }
                };
                BCPActivityStepComponent.prototype.changeSalesColor = function () {
                    if (this.vCurrentPointer === '4') {
                        this.vCollectionFlag = true;
                        this.vOffersFlag = true;
                        this.vSalesFlag = true;
                    }
                };
                BCPActivityStepComponent = __decorate([
                    core_1.Component({
                        selector: 'bcp-activity-step',
                        templateUrl: './app/basic-call-procedure/components/bcp-activity-step.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, page_navigation_service_1.PageNavigationService, router_1.Router])
                ], BCPActivityStepComponent);
                return BCPActivityStepComponent;
            }());
            exports_1("BCPActivityStepComponent", BCPActivityStepComponent);
        }
    }
});
//# sourceMappingURL=bcp-activity-step.component.js.map