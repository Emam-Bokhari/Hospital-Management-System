'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/User/user.route');
const doctor_route_1 = require('../modules/Doctor/doctor.route');
const specialization_route_1 = require('../modules/Specialization/specialization.route');
const department_route_1 = require('../modules/Department/department.route');
const staff_route_1 = require('../modules/Staff/staff.route');
const staffRole_route_1 = require('../modules/StaffRole/staffRole.route');
const test_route_1 = require('../modules/Test/test.route');
const appointmentBooking_route_1 = require('../modules/AppointmentBooking/appointmentBooking.route');
const testBooking_route_1 = require('../modules/TestBooking/testBooking.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: user_route_1.UserRoutes,
  },
  {
    path: '/doctors',
    route: doctor_route_1.DoctorRoutes,
  },
  {
    path: '/specializations',
    route: specialization_route_1.SpecializationRoutes,
  },
  {
    path: '/departments',
    route: department_route_1.DepartmentRoutes,
  },
  {
    path: '/staffs',
    route: staff_route_1.StaffRoutes,
  },
  {
    path: '/staff-roles',
    route: staffRole_route_1.StaffRoleRoutes,
  },
  {
    path: '/tests',
    route: test_route_1.TestRoutes,
  },
  {
    path: '/test-bookings',
    route: testBooking_route_1.TestBookingRoutes,
  },
  {
    path: '/appointment-bookings',
    route: appointmentBooking_route_1.AppointmentBookingRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
