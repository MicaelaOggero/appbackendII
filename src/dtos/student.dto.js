export default class StudentDTO {
    constructor(student) {
        this.id = student._id;
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.email = student.email;
        this.role = student.role;
        this.tickets = student.tickets || [];
        this.idGitHub= student.idGitHub;
    }
}
