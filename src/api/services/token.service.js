"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var config = require('../config/config.json');
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var uuid = require('uuid');
var nJwt = require('njwt');
class TokenService {
    generateToken(obj) {
        var signingkey = config.service.key;
        var claims = [];
        claims.push(obj);
        console.log(claims);
        var jwt = nJwt.create(claims, signingkey);
        var token = jwt.compact();
        return token;
    }
    verifyToken(token) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                return nJwt.verify(token, config.service.key);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map