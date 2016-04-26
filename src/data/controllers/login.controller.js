'use strict';
import { UserDAO } from '../daos/user.dao';
export class LoginController {
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const user_dao_1 = require('../daos/user.dao');
class LoginController {
    constructor() {
        this.async = postLogin(req, string, res, string);
    }
}
{
    let _userDAO = new UserDAO();
    let user = await, _userDAO, login = (req.username, req.password);
    res.json(user);
}
//# sourceMappingURL=login.controller.js.map