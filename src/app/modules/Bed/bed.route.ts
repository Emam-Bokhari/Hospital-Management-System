import express from 'express';
import { BedControllers } from './bed.controller';

const router = express.Router();

router.post('/', BedControllers.createBedController);

router.get('/', BedControllers.getAllBedsController);

router.get('/:id', BedControllers.getBedController);

router.patch('/:id', BedControllers.updateBedController);

router.patch(
  '/:id/status',
  BedControllers.updateBedAvailabilityStatusController,
);

router.delete('/:id', BedControllers.deleteBedController);

export const BedRoutes = router;
