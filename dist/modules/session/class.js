"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session = /** @class */ (function () {
  function Session(sessionData) {
    var accessToken = sessionData.accessToken,
      refreshToken = sessionData.refreshToken,
      userId = sessionData.userId;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = userId;
  }
  Session.prototype.getUserId = function () {
    return this.userId;
  };
  Session.prototype.getAccessToken = function () {
    return this.accessToken;
  };
  Session.prototype.getRefreshToken = function () {
    return this.refreshToken;
  };
  return Session;
})();
exports.default = Session;
//# sourceMappingURL=class.js.map
