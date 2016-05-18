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
            var ormS = orm.getSequelize();
            var product_cat = orm.getModel("mst_prod_cat");
            var product_sub = orm.getModel("mst_prod_sub_cat");
            var product = orm.getModel("mst_product");
            var target = orm.getModel("mst_target");
            var dsp = orm.getModel("mst_dsp");
            var sales_order = orm.getModel("trx_sales_order");
            var prd_order = orm.getModel("trx_saleord_prd_det");
            var load_order = orm.getModel("trx_saleord_load_det");
            var dateFormat = require('dateformat');
            var now = new Date();
            var vtoday = dateFormat(now, "yyyy-mm-dd");
            var dateObj = new Date();
            var vmonth = dateObj.getMonth() + 1;
            var vyear = dateObj.getFullYear();
            var vday = dateObj.getUTCDay();
            var vDaysInMonth = new Date(vyear, vmonth, 0).getDate();
            var vFirstOfMonth = new Date(vyear, vmonth - 1, 1, 0, 0, 0, 0);
            var vLastOfMonth = new Date(vyear, vmonth, 0, 11, 59, 59, 59);
            var used = vFirstOfMonth.getDay() + vLastOfMonth.getDate();
            var vWeeksInMonth = Math.ceil(used / 7);
            var curr = new Date();
            var first = curr.getDate() - curr.getDay();
            var last = first + 6;
            var firstday = new Date(curr.setDate(first)).toUTCString();
            var lastday = new Date(curr.setDate(last)).toUTCString();
            firstday;
            "Sun, 06 Mar 2011 12:25:40 GMT";
            lastday;
            "Sat, 12 Mar 2011 12:25:40 GMT";
            var vUserId = pRequest.body.salesPerson;
            var vSelectedTab = pRequest.body.actualType;
            console.log('isiss selected tab' + vSelectedTab);
            console.log('senin ' + first + ' minggu ' + last);
            if (vSelectedTab == "Day") {
                console.log('masukkkk DAYYY');
                ormS.query("SELECT mpc.brand, mpc.category_id,mpc.category_name, mpsc.sub_category_id, mpsc.sub_category_name, ceil(cast(mpt.target_qty as float)/" + vDaysInMonth + ") AS target_qty,COALESCE(SUM(transLoad.amount),0)+COALESCE(SUM(transProd.quantity),0) AS amountActual FROM mst_prod_cat AS mpc LEFT OUTER JOIN mst_prod_sub_cat mpsc ON mpc.category_id = mpsc.category_id LEFT OUTER JOIN mst_product AS mp ON mp.sub_category_id = mpsc.sub_category_id LEFT OUTER JOIN (SELECT ts.order_date, tsload.product_id,tsload.amount FROM trx_saleord_load_det AS tsload JOIN trx_sales_order ts ON ts.order_id = tsload.order_id WHERE ts.order_date = '" + vtoday + "') AS transLoad ON transload.product_id = mp.product_id LEFT OUTER JOIN ( SELECT ts.order_date, tsprod.product_id,tsprod.quantity FROM trx_saleord_prd_det AS tsprod JOIN trx_sales_order ts ON ts.order_id = tsprod.order_id WHERE ts.order_date = '" + vtoday + "')AS transProd ON transProd.product_id = mp.product_id LEFT OUTER JOIN mst_target AS mpt ON mp.product_id = mpt.product_id WHERE mpt.dsp_id = '" + vUserId + "' AND mpt.target_month = '" + vmonth + "' AND mpt.target_year = '" + vyear + "' GROUP BY mpc.category_id,mpsc.sub_category_id , mpt.target_qty ORDER BY mpc.category_id, mpsc.sub_category_id ASC;", { type: ormS.QueryTypes.SELECT })
                    .then(function (pProdCats) {
                    var vResult = {
                        "status": "Success",
                        "statusMessage": "",
                        "error": "error",
                        "ProdList": pProdCats
                    };
                    pResponse.json(vResult);
                }).catch(function (err) {
                    console.log(err);
                    pResponse.send("Failed to Fetch Data Products" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
                });
            }
            else if (vSelectedTab == "Week") {
                console.log('masukkkk WEEK');
                ormS.query("SELECT mpc.brand, mpc.category_id,mpc.category_name, mpsc.sub_category_id, mpsc.sub_category_name, ceil(cast(mpt.target_qty as float)/" + vWeeksInMonth + ") AS target_qty ,COALESCE(SUM(transLoad.amount),0)+COALESCE(SUM(transProd.quantity),0) AS amountActual FROM mst_prod_cat AS mpc LEFT OUTER JOIN mst_prod_sub_cat mpsc ON mpc.category_id = mpsc.category_id LEFT OUTER JOIN mst_product AS mp ON mp.sub_category_id = mpsc.sub_category_id LEFT OUTER JOIN (SELECT ts.order_date, tsload.product_id,tsload.amount FROM trx_saleord_load_det AS tsload JOIN trx_sales_order ts ON ts.order_id = tsload.order_id WHERE extract(month from ts.order_date) = extract(month from current_date) AND  extract(day from ts.order_date) BETWEEN '" + first + "' AND '" + last + "' AND  extract(year from ts.order_date) = extract(year from current_date)) AS transLoad ON transload.product_id = mp.product_id LEFT OUTER JOIN ( SELECT ts.order_date, tsprod.product_id,tsprod.quantity FROM trx_saleord_prd_det AS tsprod JOIN trx_sales_order ts ON ts.order_id = tsprod.order_id WHERE extract(month from ts.order_date) = extract(month from current_date) AND  extract(day from ts.order_date) BETWEEN '" + first + "' AND '" + last + "' AND  extract(year from ts.order_date) = extract(year from current_date))AS transProd ON transProd.product_id = mp.product_id LEFT OUTER JOIN mst_target AS mpt ON mp.product_id = mpt.product_id WHERE mpt.dsp_id = '" + vUserId + "' AND mpt.target_month = '" + vmonth + "' AND mpt.target_year = '" + vyear + "' GROUP BY mpc.category_id,mpsc.sub_category_id , mpt.target_qty ORDER BY mpc.category_id, mpsc.sub_category_id ASC;", { type: ormS.QueryTypes.SELECT })
                    .then(function (pProdCats) {
                    var vResult = {
                        "status": "Success",
                        "statusMessage": "",
                        "error": "error",
                        "ProdList": pProdCats
                    };
                    pResponse.json(vResult);
                }).catch(function (err) {
                    console.log(err);
                    pResponse.send("Failed to Fetch Data Products" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
                });
            }
            else if (vSelectedTab == "Month") {
                console.log('masukkkk MONTHHH');
                ormS.query("SELECT mpc.brand, mpc.category_id,mpc.category_name, mpsc.sub_category_id, mpsc.sub_category_name,  COALESCE(mpt.target_qty,0) AS target_qty ,COALESCE(SUM(transLoad.amount),0)+COALESCE(SUM(transProd.quantity),0) AS amountActual FROM mst_prod_cat AS mpc LEFT OUTER JOIN mst_prod_sub_cat mpsc ON mpc.category_id = mpsc.category_id LEFT OUTER JOIN mst_product AS mp ON mp.sub_category_id = mpsc.sub_category_id LEFT OUTER JOIN (SELECT ts.order_date, tsload.product_id,tsload.amount FROM trx_saleord_load_det AS tsload JOIN trx_sales_order ts ON ts.order_id = tsload.order_id WHERE extract(month from ts.order_date) = extract(month from current_date)) AS transLoad ON transload.product_id = mp.product_id LEFT OUTER JOIN ( SELECT ts.order_date, tsprod.product_id,tsprod.quantity FROM trx_saleord_prd_det AS tsprod JOIN trx_sales_order ts ON ts.order_id = tsprod.order_id WHERE extract(month from ts.order_date) = extract(month from current_date) )AS transProd ON transProd.product_id = mp.product_id LEFT OUTER JOIN mst_target AS mpt ON mp.product_id = mpt.product_id WHERE mpt.dsp_id = '" + vUserId + "' AND mpt.target_month = '" + vmonth + "' AND mpt.target_year = '" + vyear + "' GROUP BY mpc.category_id,mpsc.sub_category_id , mpt.target_qty ORDER BY mpc.category_id, mpsc.sub_category_id ASC;", { type: ormS.QueryTypes.SELECT })
                    .then(function (pProdCats) {
                    var vResult = {
                        "status": "Success",
                        "statusMessage": "",
                        "error": "error",
                        "ProdList": pProdCats
                    };
                    pResponse.json(vResult);
                }).catch(function (err) {
                    console.log(err);
                    pResponse.send("Failed to Fetch Data Products" + ' Time :' + new Date().toLocaleString() + " Error : " + err);
                });
            }
            return '';
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
    getProdSubCat(pRequest, pResponse) {
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