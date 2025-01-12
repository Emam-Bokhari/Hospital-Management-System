import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';
import { SpecializationRoutes } from '../modules/Specialization/specialization.route';

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
    path: "/specializations",
    route: SpecializationRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
