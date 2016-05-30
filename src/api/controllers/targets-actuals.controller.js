'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const orm_service_1 = require('../services/orm.service');
class TargetsActualsController {
    constructor() {
    }
    brand(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var message = 'Get brands start';
                console.log("Start getting brands");
                var vOrmSvc = new orm_service_1.ORMService();
                var vResult = yield vOrmSvc.sp('get_brands', null);
                console.log("Query Brands with result : " + JSON.stringify(vResponse));
                var vResponse = {
                    "status": "Success",
                    "errorMessage": "",
                    "brandList": vResult
                };
                pResponse.json(vResponse);
            }
            catch (pErr) {
                console.log("Failed to Query Payment History" + pErr);
                var vError = {
                    "status": "Error",
                    "errorMessage": pErr,
                    "result": null
                };
                pResponse.json(vError);
            }
        });
    }
    targetsActuals(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var message = 'Insert start.';
                console.log("Start targets actuals");
                var vSalesPerson = pRequest.body.salesPerson;
                var vSelectedType = pRequest.body.actualType;
                var vSelectedBrand = pRequest.body.brand;
                var vOrmSvc = new orm_service_1.ORMService();
                let vParams = {
                    sales_person: vSalesPerson,
                    type: vSelectedType,
                    brand: vSelectedBrand
                };
                var vResult = yield vOrmSvc.sp('get_target_actuals', vParams);
                console.log("Query Done with result : " + JSON.stringify(vResponse));
                var vResponse = {
                    "status": "Success",
                    "errorMessage": "",
                    "result": vResult
                };
                pResponse.json(vResponse);
            }
            catch (pErr) {
                console.log("Failed to Query Payment History" + pErr);
                var vError = {
                    "status": "Error",
                    "errorMessage": pErr,
                    "result": null
                };
                pResponse.json(vError);
            }
        });
    }
}
exports.TargetsActualsController = TargetsActualsController;
//# sourceMappingURL=targets-actuals.controller.js.map