System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', '../services/dsp-alerts.service', 'angular2/common'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, dsp_alerts_service_1, common_1;
    var DSPAlertsComponent;
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
            function (dsp_alerts_service_1_1) {
                dsp_alerts_service_1 = dsp_alerts_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            DSPAlertsComponent = (function () {
                function DSPAlertsComponent(_layoutService, _matchMediaService, _headerService, vDSPAlertService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this.vDSPAlertService = vDSPAlertService;
                    this._layoutService.setCurrentPage('DSPAlerts');
                    this._headerService.setTitle("Alert & Threshold");
                    this.loadAlert();
                }
                DSPAlertsComponent.prototype.loadAlert = function () {
                    var _this = this;
                    this.vDSPAlertService.getDSPAlert().subscribe(function (response) {
                        _this.vRetailerAlert = response.json();
                        console.log(response.json());
                    }, function (error) {
                    });
                };
                DSPAlertsComponent.prototype.getRetailerAlert = function () {
                    return this.vRetailerAlert;
                };
                DSPAlertsComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                DSPAlertsComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                DSPAlertsComponent = __decorate([
                    core_1.Component({
                        selector: 'dsp-alerts',
                        templateUrl: './app/my-transaction/components/dsp-alerts.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            dsp_alerts_service_1.DSPAlertsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, dsp_alerts_service_1.DSPAlertsService])
                ], DSPAlertsComponent);
                return DSPAlertsComponent;
            }());
            exports_1("DSPAlertsComponent", DSPAlertsComponent);
        }
    }
});
//# sourceMappingURL=dsp-alerts.component.js.map