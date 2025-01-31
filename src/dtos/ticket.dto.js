export class TicketDTO {
    constructor({ student, courses, totalPrice, status }) {
        this.student = student;
        this.courses = courses;
        this.status = status || "pending"; // Estado por defecto
        this.totalPrice = totalPrice;
        this.purchaseDate = new Date();
    }
}