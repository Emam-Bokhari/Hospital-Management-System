import { TNotice } from "./notice.interface";
import { Notice } from "./notice.model";

const createNotice = async (payload: TNotice) => {
    const createdNotice = await Notice.create(payload);
    return createdNotice;
}

export const NoticeServices = {
    createNotice,
}