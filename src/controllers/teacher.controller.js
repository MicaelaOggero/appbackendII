import TeacherService from "../services/teacher.service.js";

export const getTeacher = async (req, res) => {
    try {
        const teachers = await TeacherService.getAllTeachers();
        if(!teachers){
            return res.sendNotFound("No seencontron profesores");
        }
        res.sendSuccess(teachers);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await TeacherService.getTeacherById(id);
        if(!teacher){
            return res.sendNotFound("No seencontro profesor con el id");
        }
        res.sendSuccess(teacher);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

