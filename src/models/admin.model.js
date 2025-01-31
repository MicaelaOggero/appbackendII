import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true, 
        required: true
    },
    role: {
        type: String,
        default: "admin"
    },
    password: {
        type: String,
        required: true
    },
    idGithub:{
        type: String,
        default:""
    }
});

export default mongoose.model("admin", adminSchema);
