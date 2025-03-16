import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { NoticeServices } from "./notice.service";

const createNoticeController = asyncHandler(async (req, res) => {
    const noticePayload = req.body;
    const createdNotice = await NoticeServices.createNotice(noticePayload);

    sendResponse(res, {
        success: true,
        message: 'Notice created successfully',
        statusCode: 201,
        data: createdNotice,
    });
});

export const NoticeControllers = {
    createNoticeController,
}