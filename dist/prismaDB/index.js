'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var client_1 = require('@prisma/client');
var PrismaServices = /** @class */ (function () {
  function PrismaServices(modelName) {
    var prismaClient = new client_1.PrismaClient();
    this.prisma = prismaClient[modelName];
  }
  PrismaServices.prototype.getByField = function (field, value, select) {
    var _a;
    return this.prisma.findUnique({
      where: ((_a = {}), (_a[field] = value), _a),
      select: select,
    });
  };
  PrismaServices.prototype.getAll = function (select) {
    this.prisma.findMany({ select: select });
  };
  PrismaServices.prototype.create = function (data) {
    this.prisma.create({ data: data });
  };
  PrismaServices.prototype.update = function (id, data) {
    this.prisma.update({ where: { id: id }, data: data });
  };
  PrismaServices.prototype.delete = function (id) {
    this.prisma.delete({ where: { id: id } });
  };
  return PrismaServices;
})();
exports.default = PrismaServices;
//# sourceMappingURL=index.js.map
