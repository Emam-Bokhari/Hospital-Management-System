"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("./test.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const test_validation_1 = require("./test.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(test_validation_1.TestValidationSchema.createTestValidationSchema), test_controller_1.TestControllers.createTestController);
router.get('/', test_controller_1.TestControllers.getAllTestsController);
router.get('/:id', test_controller_1.TestControllers.getTestController);
router.patch('/:id', (0, validateRequestSchema_1.validateRequestSchema)(test_validation_1.TestValidationSchema.updateTestValidationSchema), test_controller_1.TestControllers.updateTestController);
router.patch('/:id/availability', (0, validateRequestSchema_1.validateRequestSchema)(test_validation_1.TestValidationSchema.testAvailabilityUpdateValidationSchema), test_controller_1.TestControllers.updateTestAvailabilityController);
router.delete('/:id', test_controller_1.TestControllers.deleteTestController);
exports.TestRoutes = router;
