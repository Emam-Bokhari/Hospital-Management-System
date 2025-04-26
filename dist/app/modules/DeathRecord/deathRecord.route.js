"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeathRecordRoutes = void 0;
const express_1 = __importDefault(require("express"));
const deathRecord_controller_1 = require("./deathRecord.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const deathRecord_validation_1 = require("./deathRecord.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(deathRecord_validation_1.DeathRecordValidationSchema.createDeathRecordValidationSchema), deathRecord_controller_1.DeathRecordControllers.createDeathRecordController);
router.get('/', deathRecord_controller_1.DeathRecordControllers.getAllDeathRecordsController);
router.get('/:id', deathRecord_controller_1.DeathRecordControllers.getDeathRecordController);
router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(deathRecord_validation_1.DeathRecordValidationSchema.updateDeathRecordValidationSchema), deathRecord_controller_1.DeathRecordControllers.updateDeathRecordController);
router.delete('/:id', deathRecord_controller_1.DeathRecordControllers.deleteDeathRecordController);
exports.DeathRecordRoutes = router;
