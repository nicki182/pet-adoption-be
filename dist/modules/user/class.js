'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var User = /** @class */ (function () {
  function User(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
  }
  User.prototype.getId = function () {
    return this.id;
  };
  User.prototype.getName = function () {
    return this.name;
  };
  User.prototype.getEmail = function () {
    return this.email;
  };
  User.prototype.setName = function (newName) {
    this.name = newName;
  };
  User.prototype.setEmail = function (newEmail) {
    this.email = newEmail;
  };
  return User;
})();
exports.default = User;
//# sourceMappingURL=class.js.map
