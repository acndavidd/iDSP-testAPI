/// <reference path="idsp.dao.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const mysql_service_1 = require('../services/mysql.service');
class UserDAO {
    constructor() {
        this.table_name = 'vr_master_user';
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this._mysql = new mysql_service_1.MySql();
            const query = "select * from " + this.table_name + " where username = '" + username + "' and password = '" + password + "'";
            var resp = yield this._mysql.executeQuery(query);
            let user = JSON.parse(JSON.stringify(resp));
            return user;
        });
    }
}
exports.UserDAO = UserDAO;
//# sourceMappingURL=user.dao.js.map