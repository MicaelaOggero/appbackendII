import { Router } from "express";
import { getTeacher, getTeacherById} from "../controllers/teacher.controller.js";
import { passportCall } from "../utils/passportCall.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los profesores
router.get('/', authorization(["admin"]) , getTeacher);

// Ruta para obtener un profesor por su ID
router.get('/:id', authorization(["admin"]), getTeacherById);

export default router;
