import { Router } from "express";
import { getStudent, getStudentById } from "../controllers/student.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los estudiantes
router.get('/',authorization(["admin", "teacher"]), getStudent);

// Ruta para obtener un estudiante por su ID
router.get('/:id',authorization(["admin", "teacher"]), getStudentById);

export default router;
