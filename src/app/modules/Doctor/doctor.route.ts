import express from 'express';
import { DoctorControllers } from './doctor.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DoctorValidationSchema } from './doctor.validation';

const router = express.Router();

router.post('/', validateRequestSchema(DoctorValidationSchema.createDoctorValidationSchema), DoctorControllers.createDoctorController);

router.get('/', DoctorControllers.getAllDoctorsController);

router.get('/:id', DoctorControllers.getDoctorController);

router.patch('/:id', DoctorControllers.updateDoctorController);


export const DoctorRoutes = router;
