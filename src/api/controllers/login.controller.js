'use strict';
const token_service_1 = require('../services/token.service');
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
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map