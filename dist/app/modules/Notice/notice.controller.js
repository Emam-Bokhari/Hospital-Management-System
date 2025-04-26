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
exports.NoticeControllers = exports.getNoticesByRoleController = exports.getAllNotices = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const notice_service_1 = require("./notice.service");
const createNoticeController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticePayload = req.body;
    const createdNotice = yield notice_service_1.NoticeServices.createNotice(noticePayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Notice created successfully',
        statusCode: 201,
        data: createdNotice,
    });
}));
exports.getAllNotices = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notices = yield notice_service_1.NoticeServices.getAllNotices();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Notice are retrieved successfully',
        statusCode: 200,
        data: notices,
    });
}));
exports.getNoticesByRoleController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = req.params.role;
    const notices = yield notice_service_1.NoticeServices.getNoticesByRole(role);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Notice are retrieved successfully',
        statusCode: 200,
        data: notices,
    });
}));
const getNoticeByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const notice = yield notice_service_1.NoticeServices.getNoticeById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Notice retrieved successfully',
        statusCode: 200,
        data: notice,
    });
}));
const deleteNoticeByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield notice_service_1.NoticeServices.deleteNoticeById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Notice deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.NoticeControllers = {
    createNoticeController,
    getAllNotices: exports.getAllNotices,
    getNoticesByRoleController: exports.getNoticesByRoleController,
    getNoticeByIdController,
    deleteNoticeByIdController,
};
