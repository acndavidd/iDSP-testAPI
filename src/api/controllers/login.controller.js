'use strict';
const token_service_1 = require('../services/token.service');
class LoginController {
    constructor() {
    }
    doLogin(req, res) {
        let tokenSvc = new token_service_1.TokenService();
        var result = {};
        result.token = tokenSvc.generateToken();
        res.cookie('accessToken', result.token, { httpOnly: true });
        res.json(result);
    }
    checkToken(req, res) {
        res.json('calling checkToken ' + req.body.token);
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map