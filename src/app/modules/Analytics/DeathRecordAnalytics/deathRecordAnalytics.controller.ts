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


export const DeathRecordAnalyticsControllers = {
    getDeathRecordsOverviewController,
    getDeathRecordsMonthlyStatsController,
}