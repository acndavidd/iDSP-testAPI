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
    brands(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            var product = orm.getModel("mst_prod_cat");
            product.findAll({
                attributes: ['brand'],
                group: ['brand']
            }).then(function (result) {
                console.log(result);
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "",
                    "brandList": result
                };
                pResponse.json(vResult);
            }).catch(function (err) {
                pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
    productCategories(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            var product = orm.getModel("mst_prod_cat");
            product.findAll({
                attributes: ['category_name', 'category_id', 'brand'],
                group: ['category_name', 'category_id']
            }).then(function (result) {
                console.log(result);
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
                    "CatList": result
                };
                pResponse.json(vResult);
            }).catch(function (err) {
                pResponse.send("Failed to Insert" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
    targetsActuals(pRequest, pResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var message = 'Insert start.';
                console.log("Start getting Retailer Summary");
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
                console.log(pErr);
            }
        });
    }
    productSubCategories(pRequest, pResponse) {
        try {
            var vmessage = 'Get Data Starts.';
            var vorm = new orm_service_1.ORMService();
            var vprod_cat = vorm.getModel("mst_prod_cat");
            var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");
            var vprod_cat = vorm.getModel("mst_prod_cat");
            vprod_cat_sub.findAll({
                attributes: ['sub_category_id', 'sub_category_name'],
                include: [{ model: vprod_cat, as: 'ProductCategory', required: true,
                        attributes: ['category_id', 'category_name', 'brand']
                    }]
            })
                .then(function (result) {
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
                    "SubCatList": result
                };
                pResponse.json(vResult);
            }).catch(function (err) {
                pResponse.send("Failed to Fetch Data" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
    getCategory(pRequest, pResponse) {
        try {
            var vmessage = 'Insert start.';
            var vorm = new orm_service_1.ORMService();
            var vprod_cat = vorm.getModel("mst_prod_cat");
            var vprod_cat_sub = vorm.getModel("mst_prod_sub_cat");
            vprod_cat.findAll({
                attributes: ['category_name', 'brand'],
            })
                .then(function (result) {
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
                    "CategoryList": result
                };
                pResponse.json(vResult);
            }).catch(function (err) {
                pResponse.send("Failed to get category" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
}
exports.TargetsActualsController = TargetsActualsController;
//# sourceMappingURL=targets-actuals.controller.js.map