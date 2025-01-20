import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';

import { SpecializationRoutes } from '../modules/Specialization/specialization.route';

import { DepartmentRoutes } from '../modules/Department/department.route';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { StaffRoleRoutes } from '../modules/StaffRole/staffRole.route';
import { TestRoutes } from '../modules/Test/test.route';
import { AppointmentBookingRoutes } from '../modules/AppointmentBooking/appointmentBooking.route';
import { TestBookingRoutes } from '../modules/TestBooking/testBooking.route';
import { BirthRecordRoutes } from '../modules/BirthRecord/birthRecord.route';
import { DeathRecordRoutes } from '../modules/DeathRecord/deathRecord.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/doctors',
    route: DoctorRoutes,
  },
  {
    path: '/specializations',
    route: SpecializationRoutes,
  },
  {
    path: '/departments',
    route: DepartmentRoutes,
  },
  {
    path: '/staffs',
    route: StaffRoutes,
  },
  {
    path: '/staff-roles',
    route: StaffRoleRoutes,
  },
  {
    path: '/tests',
    route: TestRoutes,
  },
  {
    path: '/test-bookings',
    route: TestBookingRoutes,
  },
  {
    path: '/appointment-bookings',
    route: AppointmentBookingRoutes,
  },
  {
    path: '/birth-records',
    route: BirthRecordRoutes,
  },
  {
    path: '/death-records',
    route: DeathRecordRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
