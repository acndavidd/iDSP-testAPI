'use strict';
const orm_service_1 = require('../services/orm.service');
class TargetsActualsController {
    constructor() {
    }
    getBrand(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            var product = orm.getModel("mst_product");
            product.findAll({
                attributes: ['brand'],
                group: ['brand']
            }).then(function (result) {
                console.log(result);
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
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
    getProdCat(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            var product = orm.getModel("mst_product_category");
            product.findAll({
                attributes: ['category_name'],
                group: ['category_name']
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
}
exports.TargetsActualsController = TargetsActualsController;
//# sourceMappingURL=targets-actuals.controller.js.map