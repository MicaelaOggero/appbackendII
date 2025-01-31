import TicketModel from "../models/ticket.model.js";

export default class TicketDAO {
    static async getAll() {
        return await TicketModel.find()
            .populate("student")
            .populate("courses");
    }

    static async getById(id) {
        return await TicketModel.findById(id)
            .populate("student")  
            .populate("courses"); 
    }
    

    static async create(ticketData) {
        const ticket = new TicketModel(ticketData);
        return await ticket.save();
    }

    
    static async updateStatus(id, status) {
        return await TicketModel.findByIdAndUpdate(id, { status }, { new: true });
    }
}
