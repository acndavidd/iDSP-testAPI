"use strict";
const error_handling_service_1 = require('./error-handling.service');
const token_model_1 = require('../models/token.model');
var vPath = require("path");
var vEnv = process.env.NODE_ENV || "DEVELOPMENT";
var vConfig = require(vPath.join(__dirname, '..', 'config', 'config.json'))[vEnv];
var vNJwt = require('njwt');
var TOKEN_ERROR = 104;
class TokenService {
    constructor() {
        TokenService._errorHandling = new error_handling_service_1.ErrorHandlingService();
    }
    encryptToken(pObject) {
        try {
            // load sign in key from config files
            let vSigningkey = vConfig.token.key;
            // encrypt token
            let vClaims = [];
            vClaims.push(pObject);
            var vJwt = vNJwt.create(pObject, vSigningkey);
            var vToken = vJwt.compact();
            return vToken;
        }
        catch (pErr) {
            TokenService._errorHandling.throwError(TOKEN_ERROR, pErr.toString());
        }
    }
    decryptToken(pToken) {
        try {
            // load sign in key from config files
            let vSigningkey = vConfig.token.key;
            let vVerifiedJwt = vNJwt.verify(pToken, vSigningkey).body;
            let vTokenObject = new token_model_1.TokenObject();
            vTokenObject.setDSPId(vVerifiedJwt.DSPId);
            vTokenObject.setOPISToken(vVerifiedJwt.OPISToken);
            return vTokenObject;
        }
        catch (pErr) {
            TokenService._errorHandling.throwError(TOKEN_ERROR, pErr.toString());
        }
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map