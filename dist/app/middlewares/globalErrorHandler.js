'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require('../config'));
const zod_1 = require('zod');
const handleZodValidationError_1 = require('../errors/handleZodValidationError');
exports.globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let error = [
    {
      path: '',
      message: '',
    },
  ];
  if (err instanceof zod_1.ZodError) {
    const formattedZodError = (0,
    handleZodValidationError_1.handleZodValidationError)(err);
    statusCode =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.statusCode;
    message =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.message;
    error =
      formattedZodError === null || formattedZodError === void 0
        ? void 0
        : formattedZodError.error;
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    statusCode,
    error,
    stack: config_1.default.node_env === 'development' ? err.stack : null,
  });
};
