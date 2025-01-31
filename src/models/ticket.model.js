import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    student: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "students"
    },
    courses: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "courses"
        }
    ],
    status: {
        type: String, 
        enum: ["pending", "confirmed"],
        default: "pending"
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    purchaseDate: { type: Date, default: Date.now }
});

export default mongoose.model("tickets", ticketSchema);
