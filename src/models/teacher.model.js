import mongoose from "mongoose"

const teacherSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"teacher"
    },
    idGithub:{
        type: String,
        default:""
    }
})

export default mongoose.model('teachers',teacherSchema)