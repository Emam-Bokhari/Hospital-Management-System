'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const user_validation_1 = require('./user.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    user_validation_1.UserValidationSchema.createUserValidationSchema,
  ),
  user_controller_1.UserControllers.createUserController,
);
router.get('/', user_controller_1.UserControllers.getAllUsersController);
router.get('/:id', user_controller_1.UserControllers.getUserController);
router.patch(
  '/:id',
  (0, validateRequestSchema_1.validateRequestSchema)(
    user_validation_1.UserValidationSchema.updateUserValidationSchema,
  ),
  user_controller_1.UserControllers.updateUserController,
);
router.delete('/:id', user_controller_1.UserControllers.deleteUserController);
exports.UserRoutes = router;
