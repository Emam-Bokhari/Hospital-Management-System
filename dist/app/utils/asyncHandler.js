'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
exports.asyncHandler = asyncHandler;
