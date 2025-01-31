import TeacherModel from "../models/teacher.model.js";

export default class TeacherDAO {
    static async getAllTeachers() {
        return await TeacherModel.find().populate("courses");
    }

    static async getTeacherById(id) {
        return await TeacherModel.findById(id).populate("courses");
    }

    static async createTeacher(data) {
        return await TeacherModel.create(data);
    }

    static async getByEmail(email) {
        return await TeacherModel.findOne({ email });
    }
    
}
