"use strict";
var config = require('../conf/config.js');
var jwt = require('jsonwebtoken');
class TokenService {
    generateToken(user) {
        return jwt.sign(user, config.key, { expiresIn: 1440 });
    }
    verifyToken(token) {
        jwt.verify(token, config.key, function (err, decoded) {
            if (err) {
                console.log(err);
                return false;
            }
            else {
                console.log(decoded);
                return true;
            }
        });
        return true;
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map