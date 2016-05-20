System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../shared/services/header.service', 'angular2/common', '../../shared/services/inventory.service'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, header_service_1, common_1, inventory_service_1;
    var InventoryComponent;
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
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (inventory_service_1_1) {
                inventory_service_1 = inventory_service_1_1;
            }],
        execute: function() {
            InventoryComponent = (function () {
                function InventoryComponent(_layoutService, _matchMediaService, _headerService, _inventoryService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                    this._headerService = _headerService;
                    this._inventoryService = _inventoryService;
                    this.vLoadShow = true;
                    this.vPhysicalShow = false;
                    this.vSubPhysicalMenuShow = [];
                    this.vSubLoadMenuShow = [];
                    // this.vSelectedDate = '20160429003012';
                    this._layoutService.setCurrentPage('Inventory');
                    this._headerService.setTitle('Inventory');
                    this._inventoryService.getProductListPhysical('asdasd', 'asd');
                }
                InventoryComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                InventoryComponent.prototype.getFilter = function () {
                    return this._layoutService.getFilter();
                };
                InventoryComponent.prototype.showMenuLoad = function () {
                    this.vLoadShow = true;
                    this.vPhysicalShow = false;
                };
                InventoryComponent.prototype.showMenuPhysical = function () {
                    this.vLoadShow = false;
                    this.vPhysicalShow = true;
                };
                InventoryComponent.prototype.subPhysicalMenuShow = function (indexArr) {
                    console.log(indexArr);
                    this.vSubPhysicalMenuShow[indexArr] = !this.vSubPhysicalMenuShow[indexArr];
                };
                InventoryComponent.prototype.subLoadMenuShow = function (indexArr) {
                    console.log(indexArr);
                    this.vSubLoadMenuShow[indexArr] = !this.vSubLoadMenuShow[indexArr];
                };
                InventoryComponent.prototype.getProductList = function () {
                    return this._inventoryService.productList;
                };
                InventoryComponent.prototype.isProductListLoaded = function () {
                    return this._inventoryService.productListStatus;
                };
                InventoryComponent = __decorate([
                    core_1.Component({
                        selector: 'inventory',
                        templateUrl: './app/my-transaction/components/inventory.component.html',
                        directives: [
                            common_1.NgModel,
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: [
                            inventory_service_1.InventoryService
                        ]
                    }), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService, header_service_1.HeaderService, inventory_service_1.InventoryService])
                ], InventoryComponent);
                return InventoryComponent;
            }());
            exports_1("InventoryComponent", InventoryComponent);
        }
    }
});
//# sourceMappingURL=inventory.component.js.map