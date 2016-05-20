System.register(['angular2/core', './modal-includes/verification-code-modal.component', './modal-includes/resend-mpin-modal.component', '../services/modal.service'], function(exports_1, context_1) {
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
    var core_1, verification_code_modal_component_1, resend_mpin_modal_component_1, modal_service_1;
    var ModalComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (verification_code_modal_component_1_1) {
                verification_code_modal_component_1 = verification_code_modal_component_1_1;
            },
            function (resend_mpin_modal_component_1_1) {
                resend_mpin_modal_component_1 = resend_mpin_modal_component_1_1;
            },
            function (modal_service_1_1) {
                modal_service_1 = modal_service_1_1;
            }],
        execute: function() {
            ModalComponent = (function () {
                function ModalComponent(_modalService) {
                    this._modalService = _modalService;
                }
                ModalComponent.prototype.getModalStatus = function () {
                    return this._modalService.getModalState();
                };
                ModalComponent.prototype.getMainModalStatus = function () {
                    return this._modalService.getMainModalState();
                };
                ModalComponent = __decorate([
                    core_1.Component({
                        selector: 'my-modal',
                        templateUrl: 'app/shared/components/modal.component.html',
                        directives: [
                            verification_code_modal_component_1.VerificationCodeModalComponent,
                            resend_mpin_modal_component_1.ResendMpinModalComponent
                        ]
                    }), 
                    __metadata('design:paramtypes', [modal_service_1.ModalService])
                ], ModalComponent);
                return ModalComponent;
            }());
            exports_1("ModalComponent", ModalComponent);
        }
    }
});
//# sourceMappingURL=modal.component.js.map