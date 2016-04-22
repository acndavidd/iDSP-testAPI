System.register(['../services/mysql.service'], function(exports_1, context_1) {
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments)).next());
        });
    };
    var mysql_service_1;
    var LoginController;
    return {
        setters:[
            function (mysql_service_1_1) {
                mysql_service_1 = mysql_service_1_1;
            }],
        execute: function() {
            LoginController = (function () {
                function LoginController() {
                }
                LoginController.prototype.postLogin = function (req, res) {
                    return __awaiter(this, void 0, void 0, function* () {
                        var _mysql = new mysql_service_1.MySql();
                        var resp = yield _mysql.executeQuery('select * from vr_config');
                        res.json(resp);
                    });
                };
                return LoginController;
            }());
            exports_1("LoginController", LoginController);
        }
    }
});
//# sourceMappingURL=login.controller.js.map