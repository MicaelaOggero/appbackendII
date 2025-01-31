import { Router } from "express";
import { createCourse, getCourse, getCourseById, addTeacher } from "../controllers/course.controller.js";
import { passportCall } from "../utils/passportCall.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los cursos
router.get('/', authorization(["admin", "student", "teacher"]),getCourse);

// Ruta para obtener un curso por su ID
router.get('/:id', authorization(["admin", "student", "teacher"]),getCourseById);

// Ruta para crear un curso
router.post('/', authorization(["admin"]),createCourse);

// Ruta para agregar un profesor a un curso | recibe id del curso por parámetro y id del profesor por body
router.post('/:id/addteacher', authorization(["admin"]), addTeacher);

export default router;
