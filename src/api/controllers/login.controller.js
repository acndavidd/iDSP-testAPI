'use strict';
const token_service_1 = require('../services/token.service');
const orm_service_1 = require('../services/orm.service');
class LoginController {
    constructor() {
    }
    login(pRequest, pResponse) {
        try {
            let vTokenSvc = new token_service_1.TokenService();
            var vTokenObj = {
                user: {
                    name: pRequest.body.username,
                    password: pRequest.body.password
                }
            };
            var vResult = {
                success: 1,
                token: vTokenSvc.generateToken(vTokenObj)
            };
            pResponse.cookie('accessToken', vResult.token, { httpOnly: true });
        }
        catch (err) {
            var vResult = {
                success: 0,
                token: ''
            };
        }
        pResponse.json(vResult);
    }
    logout(pRequest, pResponse) {
        try {
            var message = 'Insert start.';
            console.log("mw Init");
            var orm = new orm_service_1.ORMService();
            console.log("mw map mode");
            /*
            var sales_order_new = orm.getModel("trx_sales_order");
            
            console.log("mw Create");
             sales_order_new.create({
                 dsp_id: 1,
                retailer_id: 1,
                total_amount: 1000000
             }, {isNewRecord:true}
             ).then(function(pResult){
                 console.log("Successfully insert"+ pResult.get("order_id"));

                 console.log("mw Create detail unserved order");
                 var sales_order_unserved = orm.getModel("trx_unserved_order");
                 sales_order_unserved.create({
                    order_id:pResult.order_id,
                    product_id: 'ITEM_1',
                    quantity: 10,
                    remarks: 'YO MAMEN'
                 }, {isNewRecord:true}
                 ).then(function(pResult){
                     console.log("Successfully insert"+ pResult.get("order_id"));
                });
            });
            */
            var sales_order_new = orm.getModel("trx_sales_order");
            console.log("mw Create");
            sales_order_new.create({
                dsp_id: 'DSP01',
                retailer_id: 'RET01',
                total_amount: 1000000,
                remarks: 'TEST INSERT'
            }, { isNewRecord: true }).then(function (pResult) {
                console.log("Successfully insert " + pResult.get("order_id"));
                console.log("mw Create detail unserved order");
                var sales_order_unserved = orm.getModel("trx_unserved_order");
                console.log("start insert data to object");
                console.log(sales_order_unserved);
                sales_order_unserved.create({
                    order_id: pResult.order_id,
                    product_id: 'P00001',
                    quantity: 10
                }, { isNewRecord: true }).then(function (pResult) {
                    console.log("Successfully insert " + pResult.get("order_id"));
                    var queryUnserved = orm.getModel("trx_unserved_order");
                    var so = orm.getModel("trx_sales_order");
                    queryUnserved.belongsTo(so, { foreignKey: 'order_id' });
                    so.hasMany(queryUnserved, { foreignKey: 'order_id' });
                    queryUnserved.find({
                        where: { order_id: pResult.order_id },
                        include: [so]
                    }).success(function (match) {
                        console.log(match);
                    });
                });
            });
        }
        catch (pErr) {
            console.log(pErr);
        }
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map