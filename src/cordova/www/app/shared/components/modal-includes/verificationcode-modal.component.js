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
    var VerificationCodeModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            VerificationCodeModalComponent = (function () {
                function VerificationCodeModalComponent(_modalService) {
                    this._modalService = _modalService;
                }
                VerificationCodeModalComponent.prototype.close = function () {
                    this._modalService.toggleVerificationCodeModal();
                };
                VerificationCodeModalComponent = __decorate([
                    core_1.Component({
                        selector: 'verificationcode-modal',
                        templateUrl: 'app/shared/components/modal-includes/verificationcode-modal.component.html'
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], VerificationCodeModalComponent);
                return VerificationCodeModalComponent;
            }());
            exports_1("VerificationCodeModalComponent", VerificationCodeModalComponent);
        }
    }
});
//# sourceMappingURL=verificationcode-modal.component.js.map