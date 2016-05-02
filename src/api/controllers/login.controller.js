'use strict';
const token_service_1 = require('../services/token.service');
const orm_service_1 = require('../services/orm.service');
class LoginController {
    constructor() {
    }
    doLogin(req, res) {
        let tokenSvc = new token_service_1.TokenService();
        //var result = {};
        var tokenobj = {
            user: {
                name: req.body.username,
                password: req.body.password
            },
            success: 1
        };
        /*tokenobj.user = {};
        tokenobj.user.name = req.body.username;
        tokenobj.user.password = req.body.password;
        result.success = 1;*/
        var result = {
            token: tokenSvc.generateToken(tokenobj)
        };
        //result.token = tokenSvc.generateToken(tokenobj);
        res.cookie('accessToken', result.token, { httpOnly: true });
        res.json(result);
    }
    verifyToken(token) {
        let tokenSvc = new token_service_1.TokenService();
        try {
            var verify = tokenSvc.verifyToken(token);
            return verify;
        }
        catch (err) {
            throw err;
        }
    }
    sp(req, res) {
        let ormSvc = new orm_service_1.ORMService();
        var user = 'djoko';
        ormSvc.executeFunction('anjay', JSON.stringify(user));
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map