'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var winston_1 = require('winston');
var winston_daily_rotate_file_1 = __importDefault(
  require('winston-daily-rotate-file')
);
var combine = winston_1.format.combine,
  timestamp = winston_1.format.timestamp,
  printf = winston_1.format.printf,
  colorize = winston_1.format.colorize;
var loggerFormat = printf(function (_a) {
  var level = _a.level,
    message = _a.message,
    timestamp = _a.timestamp;
  return ''.concat(timestamp, '  ').concat(level, ': ').concat(message);
});
var logger = (0, winston_1.createLogger)({
  format: combine(timestamp(), loggerFormat),
  transports: [
    new winston_1.transports.Console({
      format: combine(colorize(), timestamp(), loggerFormat),
    }),
    new winston_daily_rotate_file_1.default({
      filename: './log/%DATE%-combined-logs.log',
    }),
    new winston_daily_rotate_file_1.default({
      filename: './log/%DATE%-error-logs.log',
      level: 'error',
    }),
    new winston_daily_rotate_file_1.default({
      filename: './log/%DATE%-warn-logs.log',
      level: 'warn',
    }),
    new winston_daily_rotate_file_1.default({
      filename: './log/%DATE%-info-logs.log',
      level: 'info',
    }),
  ],
});
exports.default = logger;
//# sourceMappingURL=index.js.map
