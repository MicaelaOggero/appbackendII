import { Router } from "express";
import { getAdmin, getAdminById } from "../controllers/admin.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los estudiantes
router.get('/',authorization(["admin"]), getAdmin);

// Ruta para obtener un estudiante por su ID
router.get('/:id',authorization(["admin"]), getAdminById);

export default router;
