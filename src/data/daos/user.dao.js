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
    create(user) {
        return __awaiter(this, void 0, Promise, function* () {
            this._mysql = new mysql_service_1.MySql();
            const query = "insert into " + this.table_name + " (username,password) values('" + user.username + "','" + user.password + "')";
            var resp = yield this._mysql.executeQuery(query);
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, Promise, function* () {
            this._mysql = new mysql_service_1.MySql();
            const query = "select * from " + this.table_name + " where username = '" + username + "' and password = '" + password + "'";
            //console.log(query);
            var resp = yield this._mysql.executeQuery(query);
            console.log(resp);
            let user = JSON.parse(JSON.stringify(resp));
            console.log(user);
            return user;
        });
    }
    /*async create(user:User):Promise<User> {
        const query:string = "insert into "+this.table_name+" values('"+user.username+"','"+user.password+"')";
        console.log(query);
        //var resp:string =  await this._mysql.executeQuery(query);
        return user;
    }*/
    read(id) {
        return __awaiter(this, void 0, Promise, function* () {
        });
    }
    update(user) {
        return __awaiter(this, void 0, Promise, function* () {
            return false;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, Promise, function* () {
            return false;
        });
    }
}
exports.UserDAO = UserDAO;
//# sourceMappingURL=user.dao.js.map