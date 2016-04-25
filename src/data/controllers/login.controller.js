'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mysql_service_1 = require('../services/mysql.service');
class LoginController {
    constructor() {
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _mysql = new mysql_service_1.MySql();
            var resp = yield _mysql.executeQuery('select * from vr_config');
            res.json(resp);
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map