import express from 'express';
import { NoticeControllers } from './notice.controller';
import { USER_ROLE } from '../User/user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), NoticeControllers.createNoticeController);

router.get('/', NoticeControllers.getAllNotices);

router.get('/:role', auth(USER_ROLE.user, USER_ROLE.receptionist, USER_ROLE.financeManager, USER_ROLE.admin, USER_ROLE.superAdmin), NoticeControllers.getNoticesByRoleController);

router.get('/:id', NoticeControllers.getNoticeByIdController);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), NoticeControllers.deleteNoticeByIdController);

export const NoticeRoutes = router;
