import express from 'express';
import { DeathRecordControllers } from './deathRecord.controller';

const router = express.Router();

router.post('/', DeathRecordControllers.createDeathRecordController);

router.get('/', DeathRecordControllers.getAllDeathRecordsController);

router.get('/:id', DeathRecordControllers.getDeathRecordController);

router.patch('/:id', DeathRecordControllers.updateDeathRecordController);

router.delete('/:id', DeathRecordControllers.deleteDeathRecordController);

export const DeathRecordRoutes = router;
