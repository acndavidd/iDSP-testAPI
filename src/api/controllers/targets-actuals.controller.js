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
            var product = orm.getModel("mst_prod_cat");
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
    getProduct(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            var orm = new orm_service_1.ORMService();
            var product_cat = orm.getModel("mst_prod_cat");
            var product_sub = orm.getModel("mst_prod_sub_cat");
            product_cat.findAll({
                attributes: ['category_id', 'category_name', 'brand'],
                include: [{ model: product_sub, as: 'ProductSubCategory', required: true,
                        attributes: ['sub_category_id', 'sub_category_name']
                    }]
            })
                .then(function (result) {
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
    getAllRetailerAlert(pRequest, pResponse) {
        let vOrmSvc = new orm_service_1.ORMService();
        let vDSPModel = vOrmSvc.getModel('mst_dsp');
        let vResult = [];
        var vPromises = [];
        vDSPModel.findById('1').then(function (dsp) {
            dsp.getRetailer().then(function (retailers) {
                retailers.forEach(function (retailer) {
                    var promise = retailer.getRetailerDSPAlert().then(function (alerts) {
                        vResult.push({
                            retailer_id: retailer.retailer_id,
                            retailer_name: retailer.retailer_name,
                            retailer_min: retailer.retailer_min,
                            alert: alerts
                        });
                    });
                    vPromises.push(promise);
                });
                Promise.all(vPromises).then(function () {
                    pResponse.json(vResult);
                });
            });
        });
    }
    getProdSubCat(pRequest, pResponse) {
        try {
            var vmessage = 'Insert start.';
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
                //console.log(result);
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