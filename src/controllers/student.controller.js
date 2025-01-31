import StudentService from "../services/student.service.js";

export const getStudent = async (req, res) => {
    try {
        const students = await StudentService.getAllStudents();
        if(!students){
            return res.sendNotFound("No se encontraron estudiantes");
        }
        res.sendSuccess(students);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};

export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await StudentService.getStudentById(id);
        if(!student){
            return res.sendNotFound("No seencontro estudiante con el id");
        }
        res.sendSuccess(student);
    } catch (error) {
        res.sendServerError(error.message); 
    }
};




