import { asyncHandler } from "../../../utils/global/asyncHandler";
import { sendResponse } from "../../../utils/global/sendResponse";
import { DeathRecordAnalyticsServices } from "./deathRecordAnalytics.service";

const getDeathRecordsOverviewController = asyncHandler(async (req, res) => {
    const overviewData = await DeathRecordAnalyticsServices.getDeathRecordsOverview();

    sendResponse(res, {
        success: true,
        message: "Death records overview fetched successfully",
        statusCode: 200,
        data: overviewData,
    })
});

const getDeathRecordsMonthlyStatsController = asyncHandler(async (req, res) => {
    const year = req.params.year;
    const monthlyStats = await DeathRecordAnalyticsServices.getDeathRecordsMonthlyStats(year)
    sendResponse(res, {
        success: true,
        message: "Death record monthly stats fetched successfully",
        statusCode: 200,
        data: monthlyStats,
    })
})


export const DeathRecordAnalyticsControllers = {
    getDeathRecordsOverviewController,
    getDeathRecordsMonthlyStatsController,
}