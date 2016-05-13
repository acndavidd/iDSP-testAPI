'use strict';
const orm_service_1 = require('../services/orm.service');
class AccController {
    constructor() {
    }
    getAllRetailer(pRequest, pResponse) {
        console.log("masukk sini coy");
        var vResult;
        var _vORMService = new orm_service_1.ORMService();
        var vPromises = [];
        var vResult = [];
        try {
            console.log('masuk try');
            var vAccReceivables = _vORMService.getModel("trx_account_receivable");
            console.log('masuk try 2');
            var promise = vAccReceivables.findAll().then(function (res) {
                vResult.push(res);
            });
            vPromises.push(promise);
            Promise.all(vPromises).then(function () {
                console.log('finished ' + vResult);
                pResponse.json(vResult);
            });
        }
        catch (err) {
            vResult = {
                status: "ERROR",
                statusMessage: "GAGAL BRO",
                productList: {}
            };
            console.log(err);
        }
        //pResponse.json(vResult);
    }
}
exports.AccController = AccController;
//# sourceMappingURL=accounts-receivables.controller.js.map