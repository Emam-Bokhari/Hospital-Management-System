import { asyncHandler } from "../../../utils/global/asyncHandler";
import { sendResponse } from "../../../utils/global/sendResponse";
import { DeathRecordAnalyticsServices } from "./deathRecordAnalytics.service";

const getDeathRecordsOverviewController = asyncHandler(async (req, res) => {
    const overviewData = await DeathRecordAnalyticsServices.getDeathRecordsOverview();

    sendResponse(res, {
        success: true,
        message: "Successfully fetched the death records overview",
        statusCode: 200,
        data: overviewData,
    })
});

const getDeathRecordsMonthlyStatsController = asyncHandler(async (req, res) => {
    const year = req.query.year;
    const monthlyStatsData = await DeathRecordAnalyticsServices.getDeathRecordsMonthlyStats(year as string)
    sendResponse(res, {
        success: true,
        message: `Successfully fetched death records monthly statistics for the year ${year}`,
        statusCode: 200,
        data: monthlyStatsData,
    })
})

const getDeathRecordsCausesController = asyncHandler(async (req, res) => {
    const year = req.query.year;
    const gender = req.query.gender;
    const causesData = await DeathRecordAnalyticsServices.getDeathRecordsCauses(year as string, gender as string)
    sendResponse(res, {
        success: true,
        message: `Successfully retrieved ${causesData.length} death causes data`,
        statusCode: 200,
        data: causesData
    })
})

const getDeathRecordsGenderStatsController = asyncHandler(async (req, res) => {
    const year = req.query.year;
    const genderStatsData = await DeathRecordAnalyticsServices.getDeathRecordsGenderStats(year as string)
    sendResponse(res, {
        success: true,
        message: "Gender-wise death statistics retrieved successfully.",
        statusCode: 200,
        data: genderStatsData,
    })
})


export const DeathRecordAnalyticsControllers = {
    getDeathRecordsOverviewController,
    getDeathRecordsMonthlyStatsController,
    getDeathRecordsCausesController,
    getDeathRecordsGenderStatsController,
}