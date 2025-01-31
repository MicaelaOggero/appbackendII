import CourseService from "../services/course.service.js";

export const getCourse = async (req, res) => {
    try {
        const courses = await CourseService.getAllCourses();
        if(!courses){
            return res.sendNotFound("No se encontraron cursos");
        }
        res.sendSuccess(courses);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await CourseService.getCourseById(id);
        if(!course){
            return res.sendNotFound("No se encontro curso con el id");
        }
        res.sendSuccess(course);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

export const createCourse = async (req, res) => {
    try {
        const data = req.body;
        const course = await CourseService.createCourse(data);
        if(!course){
            return res.sendNotFound("No se creo el curso");
        }
        res.sendSuccess(course);
        
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

export const addTeacher = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const { teacherId } = req.body;
        const updatedCourse = await CourseService.addTeacher(courseId, teacherId);
        
        if(!updatedCourse){
            return res.sendNotFound("No se agrego el profesor al curso");
        }
        res.sendSuccess(updatedCourse);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

