import { Router } from "express";
import { getTicket, getTicketById, createTicket, statusTicket } from "../controllers/ticket.controller.js";
import { passportCall } from "../utils/passportCall.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router();

router.use(passportCall('jwt'))

// Ruta para obtener todos los tickets
router.get('/', authorization(["admin"]),getTicket);

// Ruta para obtener un ticket por su id
router.get('/:id', authorization(["admin", "student"]),getTicketById);

// Ruta para crear un ticket
router.post('/:id/crear', authorization(["student"]), createTicket);

// Ruta para actualizar el estado del ticket | recibe solo el id del ticket al que se le quiere cambiar el estado a confirmado 
router.post('/:id', authorization(["admin"]), statusTicket);

export default router;
