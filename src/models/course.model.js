import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    },
    code:{
        type:String,
        unique: true,
    },
    price:{
        type:Number,
        require:true
    },
    capacity:{
        type: Number,
        required: true, 
        min: 0, 
    },
    teachers:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"teachers"
        }
    ]
        

})

export default mongoose.model('courses', courseSchema)