import StudentModel from "../models/student.model.js";

export default class StudentDAO {
    static async getAllStudents() {
        return await StudentModel.find().populate("tickets");
    }

    static async getStudentById(id) {
        return await StudentModel.findById(id).populate("tickets");
    }

    static async getStudentByIdGitHub(idGithub) {
        return await StudentModel.findOne({ idGithub });
    }

    static async createStudent(data) {
        return await StudentModel.create(data);
    }

    static async getByEmail(email) {
        return await StudentModel.findOne({ email });
    }

   
}
