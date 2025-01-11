import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';
import { DepartmentRoutes } from '../modules/Department/department.route';

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
    path: "/departments",
    route: DepartmentRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
