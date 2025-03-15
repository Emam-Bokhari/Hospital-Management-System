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
exports.DeathRecordAnalyticsControllers = void 0;
const asyncHandler_1 = require("../../../utils/global/asyncHandler");
const sendResponse_1 = require("../../../utils/global/sendResponse");
const deathRecordAnalytics_service_1 = require("./deathRecordAnalytics.service");
const getDeathRecordsOverviewController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const overviewData = yield deathRecordAnalytics_service_1.DeathRecordAnalyticsServices.getDeathRecordsOverview();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Successfully fetched the death records overview',
        statusCode: 200,
        data: overviewData,
    });
}));
const getDeathRecordsMonthlyStatsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year;
    const monthlyStatsData = yield deathRecordAnalytics_service_1.DeathRecordAnalyticsServices.getDeathRecordsMonthlyStats(year);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: `Successfully fetched death records monthly statistics for the year ${year}`,
        statusCode: 200,
        data: monthlyStatsData,
    });
}));
const getDeathRecordsCausesController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year;
    const gender = req.query.gender;
    const causesData = yield deathRecordAnalytics_service_1.DeathRecordAnalyticsServices.getDeathRecordsCauses(year, gender);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: `Successfully retrieved ${causesData.length} death causes data`,
        statusCode: 200,
        data: causesData,
    });
}));
const getDeathRecordsGenderStatsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year;
    const genderStatsData = yield deathRecordAnalytics_service_1.DeathRecordAnalyticsServices.getDeathRecordsGenderStats(year);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Gender-wise death statistics retrieved successfully.',
        statusCode: 200,
        data: genderStatsData,
    });
}));
const getDeathRecordsAgeGroupStatsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year;
    const ageGroupStatsData = yield deathRecordAnalytics_service_1.DeathRecordAnalyticsServices.getDeathRecordsAgeGroupStats(year);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Age group death statistics retrieved successfully',
        statusCode: 200,
        data: ageGroupStatsData,
    });
}));
exports.DeathRecordAnalyticsControllers = {
    getDeathRecordsOverviewController,
    getDeathRecordsMonthlyStatsController,
    getDeathRecordsCausesController,
    getDeathRecordsGenderStatsController,
    getDeathRecordsAgeGroupStatsController,
};
