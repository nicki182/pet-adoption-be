"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRepository = void 0;
var redis_om_1 = require("redis-om");
var redis_1 = __importDefault(require("../../redis"));
var Sesssion = /** @class */ (function (_super) {
    __extends(Sesssion, _super);
    function Sesssion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sesssion;
}(redis_om_1.Entity));
var schema = new redis_om_1.Schema(Sesssion, {
    access_token: { type: "string" },
    refresh_token: { type: "string" },
    userId: { type: "string" },
});
exports.sessionRepository = redis_1.default.getClient().fetchRepository(schema);
exports.default = Sesssion;
//# sourceMappingURL=class.js.map