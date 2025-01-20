"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRoleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const staffRole_controller_1 = require("./staffRole.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const staffRole_validation_1 = require("./staffRole.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(staffRole_validation_1.StaffRoleValidationSchema.createStaffRoleValidationSchema), staffRole_controller_1.StaffRoleControllers.createStaffRoleController);
router.get('/', staffRole_controller_1.StaffRoleControllers.getAllStaffRolesController);
router.get('/:id', staffRole_controller_1.StaffRoleControllers.getStaffRoleController);
router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(staffRole_validation_1.StaffRoleValidationSchema.createStaffRoleValidationSchema), staffRole_controller_1.StaffRoleControllers.updateStaffRoleController);
router.delete('/:id', staffRole_controller_1.StaffRoleControllers.deleteStaffRoleController);
exports.StaffRoleRoutes = router;
