System.register(['angular2/core', 'angular2/router', '../../shared/services/match-media.service', '../../shared/services/layout.service', '../../my-transaction/components/my-transaction.component', '../../basic-call-procedure/components/basic-call-procedure.component', '../../close-day/components/close-day.component', '../../close-day/components/collection.component', '../../settings/components/settings.component', '../../my-transaction/components/targets-actuals.component', '../../my-transaction/components/inventory.component', '../../my-transaction/components/retailer-route.component', '../../my-transaction/components/accounts-receivables.component', '../../my-transaction/components/dsp-alerts.component', '../../basic-call-procedure/components/retailer-sales-order.component', '../../basic-call-procedure/components/detail-retailer.component', '../../basic-call-procedure/components/retailer-inventory.component', '../../basic-call-procedure/components/bcp-collection.component', '../../basic-call-procedure/components/sales-order-payment.component', '../../close-day/components/visited-retail.component', '../../basic-call-procedure/components/bcp-activity-step.component', '../../remittance/components/remittance.component', '../../basic-call-procedure/components/call-preparation.component', '../../stock-return/components/stock-return.component', '../../basic-call-procedure/components/bcp-offer.component', '../../login/components/mpin.component', '../../shared/components/home.component'], function(exports_1, context_1) {
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
    var core_1, router_1, match_media_service_1, layout_service_1, my_transaction_component_1, basic_call_procedure_component_1, close_day_component_1, collection_component_1, settings_component_1, targets_actuals_component_1, inventory_component_1, retailer_route_component_1, accounts_receivables_component_1, dsp_alerts_component_1, retailer_sales_order_component_1, detail_retailer_component_1, retailer_inventory_component_1, bcp_collection_component_1, sales_order_payment_component_1, visited_retail_component_1, bcp_activity_step_component_1, remittance_component_1, call_preparation_component_1, stock_return_component_1, bcp_offer_component_1, mpin_component_1, home_component_1;
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
            function (retailer_sales_order_component_1_1) {
                retailer_sales_order_component_1 = retailer_sales_order_component_1_1;
            },
            function (detail_retailer_component_1_1) {
                detail_retailer_component_1 = detail_retailer_component_1_1;
            },
            function (retailer_inventory_component_1_1) {
                retailer_inventory_component_1 = retailer_inventory_component_1_1;
            },
            function (bcp_collection_component_1_1) {
                bcp_collection_component_1 = bcp_collection_component_1_1;
            },
            function (sales_order_payment_component_1_1) {
                sales_order_payment_component_1 = sales_order_payment_component_1_1;
            },
            function (visited_retail_component_1_1) {
                visited_retail_component_1 = visited_retail_component_1_1;
            },
            function (bcp_activity_step_component_1_1) {
                bcp_activity_step_component_1 = bcp_activity_step_component_1_1;
            },
            function (remittance_component_1_1) {
                remittance_component_1 = remittance_component_1_1;
            },
            function (call_preparation_component_1_1) {
                call_preparation_component_1 = call_preparation_component_1_1;
            },
            function (stock_return_component_1_1) {
                stock_return_component_1 = stock_return_component_1_1;
            },
            function (bcp_offer_component_1_1) {
                bcp_offer_component_1 = bcp_offer_component_1_1;
            },
            function (mpin_component_1_1) {
                mpin_component_1 = mpin_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
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
                            path: '/home',
                            name: 'Home',
                            component: home_component_1.HomeComponent
                        },
                        {
                            path: '/Mpin',
                            name: 'Mpin',
                            component: mpin_component_1.MpinComponent
                        },
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
                        // UNDER MY TRANSACTION TAB - START
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
                        // UNDER MY TRANSACTION TAB - END
                        // UNDER BCP TAB - START
                        {
                            path: '/callPreparation',
                            name: 'CallPreparation',
                            component: call_preparation_component_1.CallPreparationComponent
                        },
                        {
                            path: '/retailerSalesOrder',
                            name: 'RetailerSalesOrder',
                            component: retailer_sales_order_component_1.RetailerSalesOrderComponent
                        },
                        {
                            path: '/bcpActivityStep',
                            name: 'BCPActivityStep',
                            component: bcp_activity_step_component_1.BCPActivityStepComponent
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
                            path: 'bcpCollection',
                            name: 'BCPCollection',
                            component: bcp_collection_component_1.BCPCollectionComponent
                        },
                        {
                            path: '/salesOrderPayment',
                            name: 'SalesOrderPayment',
                            component: sales_order_payment_component_1.SalesOrderPaymentComponent
                        },
                        {
                            path: '/offer',
                            name: 'Offer',
                            component: bcp_offer_component_1.OfferComponent
                        },
                        // {
                        //     path: '/unservedOrder',
                        //     name: 'UnservedOrder',
                        //     component: UnservedOrderComponent
                        // },
                        // UNDER BCP TAB - END
                        // UNDER CLOSE DAY TAB - START
                        {
                            path: '/collection',
                            name: 'Collection',
                            component: collection_component_1.CollectionComponent
                        },
                        {
                            path: '/visitedRetail',
                            name: 'VisitedRetail',
                            component: visited_retail_component_1.VisitedRetailComponent
                        },
                        // UNDER SETTINGS TAB - END
                        // UNDER STOCK RETURN TAB - START
                        {
                            path: '/stockReturn',
                            name: 'StockReturn',
                            component: stock_return_component_1.StockReturnComponent
                        },
                        // UNDER STOCK RETURN TAB - END
                        // UNDER RESET TAB - START
                        // {
                        //     path: '/resetPassword',
                        //     name: 'ResetPassword',
                        //     component: ResetPasswordComponent
                        // },
                        // UNDER RESET TAB - END
                        // UNDER REMITTANCE TAB - START
                        {
                            path: '/remittance',
                            name: 'Remittance',
                            component: remittance_component_1.RemittanceComponent
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