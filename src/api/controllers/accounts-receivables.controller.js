'use strict';
const orm_service_1 = require('../services/orm.service');
class AccController {
    constructor() {
    }
    getAllRetailer(pRequest, pResponse) {
        console.log("masukk sini coy");
        var vResult;
        var _vORMService = new orm_service_1.ORMService();
        try {
            console.log('masuk try');
            var vAccReceivables = _vORMService.getModel("trx_account_receivable");
            console.log('masuk try 2');
            vAccReceivables.findAll({
                attributes: ['order_id', 'retailer_id']
            });
            console.log('Dapet acc : ' + vAccReceivables);
            vResult = vAccReceivables;
        }
        catch (err) {
            vResult = {
                status: "ERROR",
                statusMessage: "GAGAL BRO",
                productList: {}
            };
        }
        pResponse.json(vResult);
    }
}
exports.AccController = AccController;
//# sourceMappingURL=accounts-receivables.controller.js.map