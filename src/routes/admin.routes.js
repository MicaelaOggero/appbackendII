import { Router } from "express";
import { getAdmin, getAdminById, updateAdmin, deleteAdmin } from "../controllers/admin.controller.js";
import { authorization } from "../middlewares/authorization.js";
import { passportCall } from "../utils/passportCall.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los administradores
router.get('/',authorization(["admin"]), getAdmin);

// Ruta para obtener un administrador por su ID
router.get('/:id',authorization(["admin"]), getAdminById);

// Ruta para editar un administrador
router.put('/:id',authorization(["admin"]), updateAdmin);

// Ruta para eliminar un administrador
router.delete("/:id", authorization(["admin"]), deleteAdmin);

export default router;
