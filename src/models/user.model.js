"use strict";
/// <reference path="idsp.model.ts" />
class User {
    constructor(_username, _password, _role) {
        this._username = _username;
        this._password = _password;
        this._role = _role;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    get role() {
        return this._role;
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map