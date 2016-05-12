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
                group: ['brand']
            }).then(function (result) {
                console.log(result);
                pResponse.json(result);
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
                //t.rollback();
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