'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DeathRecordRoutes = void 0;
const express_1 = __importDefault(require('express'));
const deathRecord_controller_1 = require('./deathRecord.controller');
const router = express_1.default.Router();
router.post(
  '/',
  deathRecord_controller_1.DeathRecordControllers.createDeathRecordController,
);
router.get(
  '/',
  deathRecord_controller_1.DeathRecordControllers.getAllDeathRecordsController,
);
router.get(
  '/:id',
  deathRecord_controller_1.DeathRecordControllers.getDeathRecordController,
);
router.patch(
  '/:id',
  deathRecord_controller_1.DeathRecordControllers.updateDeathRecordController,
);
router.delete(
  '/:id',
  deathRecord_controller_1.DeathRecordControllers.deleteDeathRecordController,
);
exports.DeathRecordRoutes = router;
