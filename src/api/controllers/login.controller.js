'use strict';
const token_service_1 = require('../services/token.service');
const orm_service_1 = require('../services/orm.service');
class LoginController {
    constructor() {
    }
    doLogin(pReq, pRes) {
        var vResult;
        try {
            let vTokenSvc = new token_service_1.TokenService();
            var vTokenobj = {
                user: {
                    name: pReq.body.username,
                    password: pReq.body.password
                }
            };
            vResult = {
                success: 1,
                token: vTokenSvc.generateToken(vTokenobj)
            };
            pRes.cookie('accessToken', vResult.token, { httpOnly: true });
        }
        catch (pErr) {
            vResult = {
                success: 0
            };
        }
        pRes.json(vResult);
    }
    doLogout(pReq, pRes) {
        try {
            pReq.session.destroy(function (pErr) {
                if (pErr)
                    throw pErr;
                var vResult = {
                    success: 1
                };
            });
        }
        catch (pErr) {
            var vResult = {
                success: 0,
                error: pErr
            };
        }
        pRes.json(vResult);
    }
    verifyToken(pToken) {
        let vTokenSvc = new token_service_1.TokenService();
        try {
            var vVerify = vTokenSvc.verifyToken(pToken);
            return vVerify;
        }
        catch (pErr) {
            throw pErr;
        }
    }
    sp(pReq, pRes) {
        let vOrmSvc = new orm_service_1.ORMService();
        var vUser = 'djoko';
        vOrmSvc.executeFunction('anjay', JSON.stringify(vUser));
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map