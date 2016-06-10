"use strict";
const idsp_model_1 = require('../idsp.model');
class AccountReceivableModel extends idsp_model_1.IDSPModel {
    constructor(pUsername, pDay, pSource, pRetailerId, pRetailerName, pRetailerMin, pTotalAmount, pRecordStart, pRecordEnd) {
        super();
        this.Username = pUsername;
        this.RouteDay = pDay;
        this.Source = pSource;
        this.RetailerId = pRetailerId;
        this.RetailerName = pRetailerName;
        this.RetailerMin = pRetailerMin;
        this.TotalAmount = pTotalAmount;
        this.RecordStart = pRecordStart;
        this.RecordEnd = pRecordEnd;
        this.ParamSpSelf = {
            source: this.Source,
            routeday: this.RouteDay,
            retailer_id: this.RetailerId,
            retailer_name: this.RetailerName,
            retailer_min: this.RetailerMin,
            self_amount: this.TotalAmount
        };
        this.ParamOpis = {
            username: this.Username,
            recordstart: this.RecordStart,
            recordend: this.RecordEnd,
            retailername: this.RetailerName,
            retailermin: this.RetailerMin
        };
        this.ParamSpBcp = {
            username: this.Username,
            routeday: this.RouteDay,
            source: this.Source
        };
    }
}
exports.AccountReceivableModel = AccountReceivableModel;
//# sourceMappingURL=account-receivables.model.js.map