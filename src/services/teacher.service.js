import TeacherDAO from "../daos/teacher.dao.js";
import TeacherDTO from "../dtos/teacher.dto.js";

export default class TeacherService {
    static async getAllTeachers() {
        try {
            const teachers = await TeacherDAO.getAllTeachers();
            return teachers.map(teacher => new TeacherDTO(teacher));
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async getTeacherById(id) {
        try {
            const teacher = await TeacherDAO.getTeacherById(id);
            if (!teacher) throw new Error("Teacher not found");
        return new TeacherDTO(teacher);
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async createTeacher(data) {
        const newTeacher = await TeacherDAO.createTeacher(data);
        return new TeacherDTO(newTeacher);
    }

    static async getTeacherByEmail(email) {
        const teacher = await TeacherDAO.getByEmail(email);
        return teacher;
    }
}
