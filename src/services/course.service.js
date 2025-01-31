import CourseDAO from "../daos/course.dao.js";
import CourseDTO from "../dtos/course.dto.js";

export default class CourseService {
    static async getAllCourses() {
        try {
            const courses = await CourseDAO.getAllCourses();
            return courses.map(course => new CourseDTO(course));
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async getCourseById(id) {
        try {
            const course = await CourseDAO.getCourseById(id);
            if (!course) throw new Error("Course not found");
            return new CourseDTO(course);
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async createCourse(data) {
        try {
            const newCourse = await CourseDAO.createCourse(data);
            return new CourseDTO(newCourse);
        } catch (error) {
            console.log(error);
            return null;
        }
        
    }

    static async addTeacher(courseId, teacherId) {
        try {
            const updatedCourse = await CourseDAO.addTeacherToCourse(courseId, teacherId);
            if (!updatedCourse) throw new Error("Course not found or teacher addition failed");
            return new CourseDTO(updatedCourse);
        } catch (error) {
            console.log(error);
            return null;
        }
      
    }
   
}
