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
exports.generateAdmissionBookingId = void 0;
const generateDynamicId_1 = require("../../utils/modelSpecific/generateDynamicId");
const admissionBooking_model_1 = require("./admissionBooking.model");
const generateAdmissionBookingId = () => __awaiter(void 0, void 0, void 0, function* () {
    const admissionBookingId = yield (0, generateDynamicId_1.generateDynamicId)(admissionBooking_model_1.AdmissionBooking, 'ADM');
    return admissionBookingId;
});
exports.generateAdmissionBookingId = generateAdmissionBookingId;
