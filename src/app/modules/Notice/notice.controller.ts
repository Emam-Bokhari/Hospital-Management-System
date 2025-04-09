import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { NoticeServices } from './notice.service';

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

export const getAllNotices = asyncHandler(async (req, res) => {
  const notices = await NoticeServices.getAllNotices();
  sendResponse(res, {
    success: true,
    message: 'Notice are retrieved successfully',
    statusCode: 200,
    data: notices,
  });
});

export const getNoticesByRoleController = asyncHandler(async (req, res) => {
  const role = req.params.role;
  const notices = await NoticeServices.getNoticesByRole(role);
  sendResponse(res, {
    success: true,
    message: 'Notice are retrieved successfully',
    statusCode: 200,
    data: notices,
  });
});

const getNoticeByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const notice = await NoticeServices.getNoticeById(id);
  sendResponse(res, {
    success: true,
    message: 'Notice retrieved successfully',
    statusCode: 200,
    data: notice,
  });
});

const deleteNoticeByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await NoticeServices.deleteNoticeById(id);

  sendResponse(res, {
    success: true,
    message: 'Notice deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const NoticeControllers = {
  createNoticeController,
  getAllNotices,
  getNoticesByRoleController,
  getNoticeByIdController,
  deleteNoticeByIdController,
};
