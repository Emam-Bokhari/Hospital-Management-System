import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { DoctorRoutes } from '../modules/Doctor/doctor.route';
<<<<<<< HEAD
import { SpecializationRoutes } from '../modules/Specialization/specialization.route';
=======
import { DepartmentRoutes } from '../modules/Department/department.route';
>>>>>>> feature/departments-crud

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
<<<<<<< HEAD
    path: "/specializations",
    route: SpecializationRoutes
=======
    path: "/departments",
    route: DepartmentRoutes
>>>>>>> feature/departments-crud
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
