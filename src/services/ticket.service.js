import TicketDAO from "../daos/ticket.dao.js";
import CourseDAO from "../daos/course.dao.js";
import { TicketDTO } from "../dtos/ticket.dto.js";
import StudentDAO from "../daos/student.dao.js";

export default class TicketService {
    static async getTickets() {
        return await TicketDAO.getAll();
    }

    static async getTicketById(id) {
        return await TicketDAO.getById(id);
    }

    static async createTicket({ student, courses }) {
    
        const studentExists = await StudentDAO.getStudentById(student);
        if (!studentExists) {
            throw new Error("Student not found");
        }

        const selectedCourses = await CourseDAO.getByIds(courses);
        
        const totalPrice = selectedCourses.reduce((sum, course) => sum + course.price, 0);

        const newTicket = await TicketDAO.create(new TicketDTO({ student, courses, totalPrice }));
    
        return newTicket;
    }

    static async updateTicketStatus(id, status) {
        const ticket = await TicketDAO.getById(id);
        if (!ticket) throw new Error("Ticket not found");

        if (status === "confirmed") {
            
            for (const courseId of ticket.courses) {
                await CourseDAO.decrementCapacity(courseId);
            }
        }

        return await TicketDAO.updateStatus(id, status);
    }
}
