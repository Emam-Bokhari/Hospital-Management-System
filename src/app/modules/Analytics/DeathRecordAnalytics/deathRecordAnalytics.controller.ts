import { asyncHandler } from "../../../utils/global/asyncHandler";
import { sendResponse } from "../../../utils/global/sendResponse";
import { DeathRecordAnalyticsServices } from "./deathRecordAnalytics.service";

const getDeathRecordsOverviewController = asyncHandler(async (req, res) => {
    const overviewData = await DeathRecordAnalyticsServices.getDeathRecordsOverview();

    sendResponse(res, {
        success: true,
        message: "Death records overview fetched successfully.",
        statusCode: 200,
        data: overviewData,
    })
});


export const DeathRecordAnalyticsControllers = {
    getDeathRecordsOverviewController,
}