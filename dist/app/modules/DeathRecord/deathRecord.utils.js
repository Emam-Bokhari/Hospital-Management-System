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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDeathCertificateNo = void 0;
const generateDynamicId_1 = require("../../utils/modelSpecific/generateDynamicId");
const deathRecord_model_1 = require("./deathRecord.model");
// generate death certificate no
const generateDeathCertificateNo = () => __awaiter(void 0, void 0, void 0, function* () {
    const deathCertificateNo = yield (0, generateDynamicId_1.generateDynamicId)(deathRecord_model_1.DeathRecord, 'DTH', 'deathCertificateNo');
    return deathCertificateNo;
});
exports.generateDeathCertificateNo = generateDeathCertificateNo;
