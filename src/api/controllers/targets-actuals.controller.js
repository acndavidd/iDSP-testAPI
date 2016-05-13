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
    getProdSubCat(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            var orm = new orm_service_1.ORMService();
            var product = orm.getModel("mst_prod_sub_cat");
            product.findAll({
                attributes: ['sub_category_id', 'category_id', 'sub_category_name', 'brand']
            }).then(function (result) {
                console.log(result);
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
                    "SubCatList": result
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
    getProduct(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            var orm = new orm_service_1.ORMService();
            var prod_cat = orm.getModel("mst_prod_cat");
            var prod_sub_cat = orm.getModel("mst_prod_sub_cat");
            prod_sub_cat.findAll({
                attributes: ['sub_category_name', 'sub_category_id', 'category_id', 'brand']
            }).then(function (result) {
                console.log(result);
                var vResult = {
                    "status": "Success",
                    "statusMessage": "",
                    "error": "error",
                    "ProdList": result
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