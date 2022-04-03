"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sesssion = /** @class */ (function () {
    function Sesssion(sessionData) {
        this.secret = process.env.JWT_KEY;
        this.access_token = sessionData.access_token;
        this.refresh_token = sessionData.refresh_token;
        this.userId = sessionData.userId;
    }
    Sesssion.prototype.getAccessToken = function () {
        return this.access_token;
    };
    Sesssion.prototype.getRefreshToken = function () {
        return this.refresh_token;
    };
    Sesssion.prototype.getUserId = function () {
        return this.userId;
    };
    return Sesssion;
}());
exports.default = Sesssion;
//# sourceMappingURL=class.js.map