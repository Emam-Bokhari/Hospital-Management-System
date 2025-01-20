"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArrayField = void 0;
const flattenAndUpdate_1 = require("./flattenAndUpdate");
const updateArrayField = (field, data, updateObject) => {
    data.forEach((item, index) => (0, flattenAndUpdate_1.flattenAndUpdate)(`${field}.${index}`, item, updateObject));
};
exports.updateArrayField = updateArrayField;
