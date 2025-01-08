import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: "/doctors",
    route: DoctorRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
