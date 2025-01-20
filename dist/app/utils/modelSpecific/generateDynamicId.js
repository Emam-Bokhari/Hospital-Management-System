"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDynamicId = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const HttpError_1 = require("../../errors/HttpError");
const generateDynamicId = (model, prefix) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const lastRecord = yield model
            .findOne({})
            .select('id')
            .sort({ createdAt: -1 })
            .lean();
        // XXX-YYYYMMDD-XXXX
        // extract the date part (YYYYMMDD) and unique number from the last id
        const lastDatePart = (_a = lastRecord === null || lastRecord === void 0 ? void 0 : lastRecord.id) === null || _a === void 0 ? void 0 : _a.slice(4, 12);
        const lastUniquePart = (_b = lastRecord === null || lastRecord === void 0 ? void 0 : lastRecord.id) === null || _b === void 0 ? void 0 : _b.slice(13);
        // get current date in YYYYMMDD format
        const today = moment_timezone_1.default.tz('Asia/Dhaka');
        const dateFormatted = today.format('YYYYMMDD');
        if (lastDatePart === dateFormatted) {
            const nextUniquePart = (parseInt(lastUniquePart, 10) + 1)
                .toString()
                .padStart(4, '0');
            return `${prefix}-${dateFormatted}-${nextUniquePart}`;
        }
        return `${prefix}-${dateFormatted}-0001`;
    }
    catch (err) {
        throw new HttpError_1.HttpError(400, err.message);
    }
});
exports.generateDynamicId = generateDynamicId;
