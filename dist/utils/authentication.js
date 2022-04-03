'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
var generateToken = function (userId) {
  var secret = process.env.JWT_KEY;
  return jsonwebtoken_1.default.sign({ userId: userId }, secret);
};
exports.generateToken = generateToken;
var verifyToken = function (token) {
  var secret = process.env.JWT_KEY;
  return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authentication.js.map
