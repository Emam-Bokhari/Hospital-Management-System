"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterBadWords = void 0;
const badWords_1 = require("../../constants/badWords");
// check bad words
const filterBadWords = (text) => {
    const regex = new RegExp(`\\b(${badWords_1.badWords.join("|")})\\b`, "gi");
    return regex.test(text);
};
exports.filterBadWords = filterBadWords;
