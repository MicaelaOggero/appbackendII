import CourseModel from "../models/course.model.js";
import TeacherModel from "../models/teacher.model.js";
import mongoose from "mongoose";

export default class CourseDAO {
    static async getAllCourses() {
        return await CourseModel.find();
    }

    static async getCourseById(id) {
        return await CourseModel.findById(id);
    }

    static async createCourse(data) {
        return await CourseModel.create(data);
    }

    static async getByIds(courseIds) {
        return await CourseModel.find({ _id: { $in: courseIds } });
    }

    static async decrementCapacity(courseId) {
        const course = await CourseModel.findById(courseId);
        if (course.capacity <= 0) throw new Error(`No capacity left for course ${course.name}`);
        course.capacity -= 1;
        await course.save();
    }

    static async addTeacherToCourse(courseId, teacherId) {
        try {

            if (!mongoose.Types.ObjectId.isValid(teacherId) || !mongoose.Types.ObjectId.isValid(courseId)) {
                throw new Error("ID de profesor o curso inválido");
            }

            const teacher = await TeacherModel.findById(teacherId); 
    
            if (!teacher) {
                throw new Error("El profesor no está registrado"); 
            }
    
            // Si el profesor existe, agregarlo al curso
            const updatedCourse = await CourseModel.findByIdAndUpdate(
                courseId,
                { $push: { teachers: teacherId } },
                { new: true }
            );
    
            return updatedCourse;
        } catch (error) {
            throw new Error(`Error al agregar el profesor al curso: ${error.message}`);
        }
    }
    

  
}
