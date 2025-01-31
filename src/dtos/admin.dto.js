export default class AdminDTO {
    constructor(admin) {
        this.id = admin._id;
        this.firstName = admin.firstName;
        this.lastName = admin.lastName;
        this.email = admin.email;
        this.role = admin.role;
        this.idGithub= admin.idGithub
    }
}
