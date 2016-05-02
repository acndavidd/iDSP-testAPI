"use strict";
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
        var jwt = nJwt.create(obj, signingkey);
        var token = jwt.compact();
        return token;
    }
    verifyToken(token) {
        try {
            return nJwt.verify(token, config.service.key);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map