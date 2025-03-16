import { HttpError } from "../../errors/HttpError";
import { TNotice } from "./notice.interface";
import { Notice } from "./notice.model";

const createNotice = async (payload: TNotice) => {
    const createdNotice = await Notice.create(payload);
    return createdNotice;
}

export const getAllNotices = async () => {
    const notices = await Notice.find();

    if (notices.length === 0) {
        throw new HttpError(404, "No notice were found in the database")
    }

    return notices;
}

export const NoticeServices = {
    createNotice,
}