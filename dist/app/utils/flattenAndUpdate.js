'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.flattenAndUpdate = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const flattenAndUpdate = (fieldName, data, updateObj) => {
  if (data && Object.keys(data).length) {
    for (const [key, value] of Object.entries(data)) {
      updateObj[`${fieldName}.${key}`] = value;
    }
  }
};
exports.flattenAndUpdate = flattenAndUpdate;
