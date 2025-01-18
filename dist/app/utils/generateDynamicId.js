'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateDynamicId = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const HttpError_1 = require('../errors/HttpError');
const generateDynamicId = (model, prefix) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
      const lastRecord = yield model
        .findOne({}, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
      // XXX-YYYYMMDD-XXXX
      // extract the date part (YYYYMMDD) and unique number from the last id
      const lastDatePart =
        (_a =
          lastRecord === null || lastRecord === void 0
            ? void 0
            : lastRecord.id) === null || _a === void 0
          ? void 0
          : _a.slice(4, 12);
      const lastUniquePart =
        (_b =
          lastRecord === null || lastRecord === void 0
            ? void 0
            : lastRecord.id) === null || _b === void 0
          ? void 0
          : _b.slice(13);
      // get current date in YYYYMMDD format
      const today = new Date();
      const dateFormatted =
        (_c = today.toISOString()) === null || _c === void 0
          ? void 0
          : _c.split('T')[0].replace(/-/g, '');
      if (lastDatePart === dateFormatted) {
        const nextUniquePart = (parseInt(lastUniquePart, 10) + 1)
          .toString()
          .padStart(4, '0');
        return `${prefix}-${dateFormatted}-${nextUniquePart}`;
      }
      return `${prefix}-${dateFormatted}-0001`;
    } catch (err) {
      throw new HttpError_1.HttpError(400, err.message);
    }
  });
exports.generateDynamicId = generateDynamicId;
