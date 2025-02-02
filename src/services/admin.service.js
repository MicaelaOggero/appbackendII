import AdminDTO from "../dtos/admin.dto.js";
import StudentDTO from "../dtos/student.dto.js";
import TeacherDTO from "../dtos/teacher.dto.js";
import AdminDAO from "../daos/admin.dao.js";
import StudentDAO from "../daos/student.dao.js";
import TeacherDAO from "../daos/teacher.dao.js";
import mongoose from "mongoose";

export default class AdminService {

    static async getAllAdmin() {

        try {
            const admins = await AdminDAO.getAllAdmin();
            return admins.map(admin => new AdminDTO(admin));
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
    
    static async getAdminById(id) {
        try {

            const admin = await AdminDAO.getAdminById(id);

            return new AdminDTO(admin);
            
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async getAdminByEmail(email) {
        const admin = await AdminDAO.getByEmail(email);
        return admin;
    }

    static async createAdmin(data) {
        const newAdmin = await AdminDAO.createAdmin(data);
        return new AdminDTO(newAdmin);
    }

    static async updateAdmin(id, updatedData) {
        // Verificar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        // Buscar si el administrador existe
        const admin = await AdminDAO.getAdminById(id);
        if (!admin) {
            throw new Error("Admin not found");
        }

        // Verificar si el rol ha cambiado
        if (updatedData.role && updatedData.role !== admin.role) {
            const newRole = updatedData.role;

            // Eliminar el administrador de la colección actual
            await AdminDAO.deleteAdmin(id);

            // Crear el usuario en la colección correspondiente
            if (newRole === "student") {
                const newStudent = await StudentDAO.createStudent(updatedData);
                return new StudentDTO(newStudent);
            } else if (newRole === "teacher") {
                const newTeacher = await TeacherDAO.createTeacher(updatedData);
                return new TeacherDTO(newTeacher);
            } else {
                throw new Error("Invalid role. Must be 'student' or 'teacher'");
            }
        }

        // Si el rol no cambia, actualizar los datos del admin
        const updatedAdmin = await AdminDAO.updateAdmin(id, updatedData);
        return new AdminDTO(updatedAdmin);
    }

    static async deleteAdmin(id) {
        // Verificar que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        // Buscar si el administrador existe
        const admin = await AdminDAO.getAdminById(id);
        if (!admin) {
            throw new Error("Admin not found");
        }

        // Eliminar el administrador de la colección
        await AdminDAO.deleteAdmin(id);
        
    }
}


