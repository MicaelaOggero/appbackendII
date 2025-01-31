export default class TeacherDTO {
    constructor(teacher) {
        this.id = teacher._id;
        this.fullName = `${teacher.firstName} ${teacher.lastName}`;
        this.email = teacher.email;
        this.role = teacher.role;
        this.idGitHub= teacher.idGitHub;
    }
}
