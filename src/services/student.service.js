import StudentDAO from "../daos/student.dao.js";
import StudentDTO from "../dtos/student.dto.js";

export default class StudentService {
    static async getAllStudents() {
        try {
            const students = await StudentDAO.getAllStudents();
            return students.map(student => new StudentDTO(student))
        } catch (error) {
            console.log(error);
            return null;
        };
    }

    static async getStudentById(id) {
        try {
            const student = await StudentDAO.getStudentById(id);
            return new StudentDTO(student);
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async getByIdGithub(id) {
        const student = await StudentDAO.getStudentByIdGitHub(id);
        return student ? new StudentDTO(student) : null;
    }

    static async createStudent(data) {
        const newStudent = await StudentDAO.createStudent(data);
        return new StudentDTO(newStudent);
    }

    static async getStudentByEmail(email) {
        const student = await StudentDAO.getByEmail(email);
        return student;
    }
}
