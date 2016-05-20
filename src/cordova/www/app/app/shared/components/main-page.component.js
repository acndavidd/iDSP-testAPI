System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../my-transaction/components/my-transaction.component', '../../basic-call-procedure/components/basic-call-procedure.component', '../../close-day/components/close-day.component', '../../close-day/components/collection.component', '../../settings/components/settings.component', '../../my-transaction/components/targets-actuals.component', '../../my-transaction/components/inventory.component', '../../my-transaction/components/retailer-route.component', '../../my-transaction/components/accounts-receivables.component', '../../my-transaction/components/dsp-alerts.component', '../../settings/components/reset-password.component', '../../basic-call-procedure/components/retailer-sales-order.component', '../../basic-call-procedure/components/detail-retailer.component', '../../basic-call-procedure/components/retailer-inventory.component', '../../basic-call-procedure/components/sales-order-payment.component', '../../close-day/components/cd-targets-actuals.component', '../../close-day/components/visited-retail.component'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, my_transaction_component_1, basic_call_procedure_component_1, close_day_component_1, collection_component_1, settings_component_1, targets_actuals_component_1, inventory_component_1, retailer_route_component_1, accounts_receivables_component_1, dsp_alerts_component_1, reset_password_component_1, retailer_sales_order_component_1, detail_retailer_component_1, retailer_inventory_component_1, sales_order_payment_component_1, cd_targets_actuals_component_1, visited_retail_component_1;
    var MainPageComponent;
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
            function (my_transaction_component_1_1) {
                my_transaction_component_1 = my_transaction_component_1_1;
            },
            function (basic_call_procedure_component_1_1) {
                basic_call_procedure_component_1 = basic_call_procedure_component_1_1;
            },
            function (close_day_component_1_1) {
                close_day_component_1 = close_day_component_1_1;
            },
            function (collection_component_1_1) {
                collection_component_1 = collection_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (targets_actuals_component_1_1) {
                targets_actuals_component_1 = targets_actuals_component_1_1;
            },
            function (inventory_component_1_1) {
                inventory_component_1 = inventory_component_1_1;
            },
            function (retailer_route_component_1_1) {
                retailer_route_component_1 = retailer_route_component_1_1;
            },
            function (accounts_receivables_component_1_1) {
                accounts_receivables_component_1 = accounts_receivables_component_1_1;
            },
            function (dsp_alerts_component_1_1) {
                dsp_alerts_component_1 = dsp_alerts_component_1_1;
            },
            function (reset_password_component_1_1) {
                reset_password_component_1 = reset_password_component_1_1;
            },
            function (retailer_sales_order_component_1_1) {
                retailer_sales_order_component_1 = retailer_sales_order_component_1_1;
            },
            function (detail_retailer_component_1_1) {
                detail_retailer_component_1 = detail_retailer_component_1_1;
            },
            function (retailer_inventory_component_1_1) {
                retailer_inventory_component_1 = retailer_inventory_component_1_1;
            },
            function (sales_order_payment_component_1_1) {
                sales_order_payment_component_1 = sales_order_payment_component_1_1;
            },
            function (cd_targets_actuals_component_1_1) {
                cd_targets_actuals_component_1 = cd_targets_actuals_component_1_1;
            },
            function (visited_retail_component_1_1) {
                visited_retail_component_1 = visited_retail_component_1_1;
            }],
        execute: function() {
            MainPageComponent = (function () {
                function MainPageComponent(_layoutService, _matchMediaService) {
                    this._layoutService = _layoutService;
                    this._matchMediaService = _matchMediaService;
                }
                MainPageComponent.prototype.getResize = function () {
                    return this._matchMediaService.getMm();
                };
                MainPageComponent = __decorate([
                    core_1.Component({
                        selector: 'main-page',
                        templateUrl: './app/shared/components/main-page.component.html',
                        directives: [
                            router_1.ROUTER_DIRECTIVES
                        ],
                        providers: []
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/myTransaction',
                            name: 'MyTransaction',
                            component: my_transaction_component_1.MyTransactionComponent
                        },
                        {
                            path: '/basicCallProcedure',
                            name: 'BasicCallProcedure',
                            component: basic_call_procedure_component_1.BasicCallProcedureComponent
                        },
                        {
                            path: '/closeDay',
                            name: 'CloseDay',
                            component: close_day_component_1.CloseDayComponent
                        },
                        {
                            path: '/settings',
                            name: 'Settings',
                            component: settings_component_1.SettingsComponent
                        },
                        //UNDER MY TRANSACTION TAB - START
                        {
                            path: '/targetsActuals',
                            name: 'TargetsActuals',
                            component: targets_actuals_component_1.TargetsActualsComponent
                        },
                        {
                            path: '/inventory',
                            name: 'Inventory',
                            component: inventory_component_1.InventoryComponent
                        },
                        {
                            path: '/retailerRoute',
                            name: 'RetailerRoute',
                            component: retailer_route_component_1.RetailerRouteComponent
                        },
                        {
                            path: '/accountsReceivables',
                            name: 'AccountsReceivables',
                            component: accounts_receivables_component_1.AccountsReceivablesComponent
                        },
                        {
                            path: '/dspAlerts',
                            name: 'DSPAlerts',
                            component: dsp_alerts_component_1.DSPAlertsComponent
                        },
                        //UNDER MY TRANSACTION TAB - END
                        //UNDER BCP TAB - START
                        {
                            path: '/retailerSalesOrder',
                            name: 'RetailerSalesOrder',
                            component: retailer_sales_order_component_1.RetailerSalesOrderComponent
                        },
                        {
                            path: '/detailRetailer',
                            name: 'DetailRetailer',
                            component: detail_retailer_component_1.DetailRetailerComponent
                        },
                        {
                            path: '/retailerInventory',
                            name: 'RetailerInventory',
                            component: retailer_inventory_component_1.RetailerInventoryComponent
                        },
                        {
                            path: '/salesOrderPayment',
                            name: 'SalesOrderPayment',
                            component: sales_order_payment_component_1.SalesOrderPaymentComponent
                        },
                        //UNDER BCP TAB - END
                        //UNDER CLOSE DAY TAB - START
                        {
                            path: '/collection',
                            name: 'Collection',
                            component: collection_component_1.CollectionComponent
                        },
                        {
                            path: '/closeDayTargetsActuals',
                            name: 'CDTargetsActuals',
                            component: cd_targets_actuals_component_1.CDTargetsActualsComponent
                        },
                        {
                            path: '/visitedRetail',
                            name: 'VisitedRetail',
                            component: visited_retail_component_1.VisitedRetailComponent
                        },
                        //UNDER SETTINGS TAB - END
                        //UNDER SETTINGS TAB - START
                        {
                            path: '/resetPassword',
                            name: 'ResetPassword',
                            component: reset_password_component_1.ResetPasswordComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [layout_service_1.LayoutService, match_media_service_1.MatchMediaService])
                ], MainPageComponent);
                return MainPageComponent;
            }());
            exports_1("MainPageComponent", MainPageComponent);
        }
    }
});
//# sourceMappingURL=main-page.component.js.map