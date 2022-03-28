"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_KEY);
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};
exports.verifyToken = verifyToken;
