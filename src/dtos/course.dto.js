export default class CourseDTO {
    constructor(course) {
        this.id = course._id;
        this.name = course.name;
        this.description = course.description || "No description provided";
        this.code = course.code;
        this.price = course.price;
        this.capacity= course.capacity;
        this.teachers = course.teachers; 
    }
}
