import express from 'express';
import { NoticeControllers } from './notice.controller';

const router = express.Router();

router.post('/', NoticeControllers.createNoticeController);

router.get('/', NoticeControllers.getAllNotices);

router.get('/:role', NoticeControllers.getNoticesByRoleController);

router.get('/:id', NoticeControllers.getNoticeByIdController);

router.delete('/:id', NoticeControllers.deleteNoticeByIdController);

export const NoticeRoutes = router;
