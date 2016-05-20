System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ModalService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ModalService = (function () {
                function ModalService() {
                    this.vMainModalState = false;
                    this.vModalState = {
                        info: false,
                        verificationCode: false,
                        collection: false
                    };
                }
                ModalService.prototype.getMainModalState = function () {
                    return this.vMainModalState;
                };
                ModalService.prototype.getModalState = function () {
                    return this.vModalState;
                };
                ModalService.prototype.toggleVerificationCodeModal = function () {
                    if (this.vMainModalState) {
                        this.refreshModal();
                    }
                    else {
                        this.vModalState.verificationCode = !this.vModalState.verificationCode;
                    }
                    this.vMainModalState = !this.vMainModalState;
                };
                ModalService.prototype.toggleCollectionModal = function () {
                    if (this.vMainModalState) {
                        this.refreshModal();
                    }
                    else {
                        this.vModalState.collection = !this.vModalState.collection;
                    }
                    this.vMainModalState = !this.vMainModalState;
                };
                ModalService.prototype.refreshModal = function () {
                    this.vModalState.info = false;
                    this.vModalState.collection = false;
                    this.vModalState.verificationCode = false;
                };
                ModalService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ModalService);
                return ModalService;
            }());
            exports_1("ModalService", ModalService);
        }
    }
});
//# sourceMappingURL=modal.service.js.map