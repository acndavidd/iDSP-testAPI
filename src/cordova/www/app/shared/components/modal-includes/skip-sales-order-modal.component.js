System.register(['angular2/core', '../../services/modal.service'], function(exports_1, context_1) {
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
    var core_1, modal_service_1;
    var SkipSalesOrderModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            SkipSalesOrderModalComponent = (function () {
                function SkipSalesOrderModalComponent(_modalService) {
                    this._modalService = _modalService;
                }
                SkipSalesOrderModalComponent.prototype.close = function () {
                    this._modalService.toggleSkipSalesOrderModal();
                };
                SkipSalesOrderModalComponent = __decorate([
                    core_1.Component({
                        selector: 'skip-sales-order-modal',
                        templateUrl: 'app/shared/components/modal-includes/skip-sales-order-modal.component.html'
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], SkipSalesOrderModalComponent);
                return SkipSalesOrderModalComponent;
            }());
            exports_1("SkipSalesOrderModalComponent", SkipSalesOrderModalComponent);
        }
    }
});
//# sourceMappingURL=skip-sales-order-modal.component.js.map