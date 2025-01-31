import { Router } from "express"
import {login, logout, register, github, passwordReset } from "../controllers/auth.controller.js"
import { passportCall } from "../utils/passportCall.js"
import passwordResetModel from "../models/passwordReset.model.js"
import studentModel from "../models/student.model.js"
import teacherModel from "../models/teacher.model.js"
import adminModel from "../models/admin.model.js"
import {createHash} from "../utils/hashingUtils.js"

const router = Router()

router.post('/register', passportCall('register'),register)
router.post('/login',passportCall('login'),login)
router.get('/logout',logout)
router.get('/github',passportCall('github'))
router.get('/githubcallback',passportCall('github'),github)
router.post('/passwordReset',passwordReset)
router.post('/reset', async (req, res) => {  
    const { email, resetToken } = req.query;
    const { password } = req.body;

    if (!password || !email || !resetToken) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const passwordHash = createHash(password);  // Asegúrate de tener la función createHash implementada correctamente

    try {
        // Buscar en passwordResetModel si el email tiene un token válido
        const response = await passwordResetModel.findOne({ email });

        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verificar si el resetToken es válido y no ha expirado
        if (response.resetToken !== resetToken) {
            return res.status(400).json({ message: "Invalid reset token" });
        }

        if (new Date() - new Date(response.createdAt) > 900000) {  // 900000 ms = 15 minutos
            return res.status(400).json({ message: "Reset token has expired" });
        }

        // Buscar al usuario en cada colección
        let userRole = null;
        let userModel = null;

        const student = await studentModel.findOne({ email });
        if (student) {
            userRole = "student";
            userModel = studentModel;
        }

        const teacher = await teacherModel.findOne({ email });
        if (teacher) {
            userRole = "teacher";
            userModel = teacherModel;
        }

        const admin = await adminModel.findOne({ email });
        if (admin) {
            userRole = "admin";
            userModel = adminModel;
        }

        // Si no se encontró el usuario en ninguna colección
        if (!userRole) {
            return res.status(404).json({ message: "User role not found" });
        }

        // Actualizar la contraseña en la colección correspondiente
        await userModel.updateOne({ email }, { $set: { password: passwordHash } });

        res.json({ message: `Password successfully reset for ${userRole}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});


export default router