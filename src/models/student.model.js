import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: "student"
    },
    password: {
        type: String
    },
    tickets:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"tickets"
        }
    ],
    idGithub:{
        type: String,
        default:""
    }

})

export default mongoose.model('students', studentSchema);