'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.NoticeServices =
  exports.getNoticeById =
  exports.getNoticesByRole =
  exports.getAllNotices =
    void 0;
const HttpError_1 = require('../../errors/HttpError');
const notice_model_1 = require('./notice.model');
const createNotice = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createdNotice = yield notice_model_1.Notice.create(payload);
    return createdNotice;
  });
const getAllNotices = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const notices = yield notice_model_1.Notice.find().populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (notices.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No notice were found in the database',
      );
    }
    return notices;
  });
exports.getAllNotices = getAllNotices;
const getNoticesByRole = (role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const notices = yield notice_model_1.Notice.find({ targetAudience: role });
    if (notices.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        `No notice were found with role ${role}`,
      );
    }
    return notices;
  });
exports.getNoticesByRole = getNoticesByRole;
const getNoticeById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const notice = yield notice_model_1.Notice.findById(id).populate({
      path: 'createdBy',
      select: 'firstName lastName email role',
    });
    if (!notice) {
      throw new HttpError_1.HttpError(404, `No notice found with ID ${id}`);
    }
    return notice;
  });
exports.getNoticeById = getNoticeById;
const deleteNoticeById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedNotice = yield notice_model_1.Notice.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedNotice) {
      throw new HttpError_1.HttpError(404, `No notice found with ID: ${id}`);
    }
    return deletedNotice;
  });
exports.NoticeServices = {
  createNotice,
  getAllNotices: exports.getAllNotices,
  getNoticesByRole: exports.getNoticesByRole,
  getNoticeById: exports.getNoticeById,
  deleteNoticeById,
};
