'use strict';
const token_service_1 = require('../services/token.service');
const orm_service_1 = require('../services/orm.service');
class LoginController {
    constructor() {
    }
    doLogin(req, res) {
        try {
            let tokenSvc = new token_service_1.TokenService();
            var tokenobj = {
                user: {
                    name: req.body.username,
                    password: req.body.password
                }
            };
            var result = {
                success: 1,
                token: tokenSvc.generateToken(tokenobj)
            };
            res.cookie('accessToken', result.token, { httpOnly: true });
        }
        catch (err) {
            var result = {
                success: 0
            };
        }
        res.json(result);
    }
    doLogout(req, res) {
        try {
            req.session.destroy(function (err) {
                if (err)
                    throw err;
                var result = {
                    success: 1
                };
            });
        }
        catch (err) {
            var result = {
                success: 0,
                error: err
            };
        }
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