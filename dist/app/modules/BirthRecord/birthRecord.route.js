"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthRecordRoutes = void 0;
const express_1 = __importDefault(require("express"));
const birthRecord_controller_1 = require("./birthRecord.controller");
const router = express_1.default.Router();
router.post('/', birthRecord_controller_1.BirthRecordControllers.createBirthRecordController);
router.get('/', birthRecord_controller_1.BirthRecordControllers.getAllBirthRecordsController);
router.get('/:id', birthRecord_controller_1.BirthRecordControllers.getBirthRecordController);
router.patch('/:id', birthRecord_controller_1.BirthRecordControllers.updateBirthRecordController);
router.delete('/:id', birthRecord_controller_1.BirthRecordControllers.deleteBirthRecordController);
exports.BirthRecordRoutes = router;
