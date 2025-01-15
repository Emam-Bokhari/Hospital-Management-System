import express from 'express';
import { StaffControllers } from './staff.controller';

const router = express.Router();

router.post('/', StaffControllers.createStaffController);

router.get('/', StaffControllers.getAllStaffsController);

router.get('/:id', StaffControllers.getStaffController);

router.patch('/:id', StaffControllers.updateStaffController);

router.delete('/:id', StaffControllers.deleteStaffController);

export const StaffRoutes = router;
