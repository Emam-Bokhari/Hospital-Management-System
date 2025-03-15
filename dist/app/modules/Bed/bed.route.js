"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bed_controller_1 = require("./bed.controller");
const router = express_1.default.Router();
router.post('/', bed_controller_1.BedControllers.createBedController);
router.get('/', bed_controller_1.BedControllers.getAllBedsController);
router.get('/:id', bed_controller_1.BedControllers.getBedController);
router.patch('/:id', bed_controller_1.BedControllers.updateBedController);
router.patch('/:id/status', bed_controller_1.BedControllers.updateBedAvailabilityStatusController);
router.delete('/:id', bed_controller_1.BedControllers.deleteBedController);
exports.BedRoutes = router;
