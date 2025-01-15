import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';

import { SpecializationRoutes } from '../modules/Specialization/specialization.route';

import { DepartmentRoutes } from '../modules/Department/department.route';
import { StaffRoutes } from '../modules/Staff/staff.route';
import { StaffRoleRoutes } from '../modules/StaffRole/staffRole.route';
import { TestRoutes } from '../modules/Test/test.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
