import TicketService from "../services/ticket.service.js";

export const getTicket = async (req, res) => {
    try {
        const tickets = await TicketService.getTickets();
        if(!tickets){
            return res.sendNotFound("No seencontron tickets");
        }
        res.sendSuccess(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTicketById = async (req, res) => {
    try {
        const ticket = await TicketService.getTicketById(req.params.id);
        if(!ticket){
            return res.sendNotFound("No seencontro ticket con el id");
        }
        res.sendSuccess(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTicket = async (req, res) => {

    try {
        const { id: student } = req.params;
        const  {courses}  = req.body;

        if (!student || !courses) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        const newTicket = await TicketService.createTicket({ student, courses });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const statusTicket = async (req, res) => {
    try {
        const updatedTicket = await TicketService.updateTicketStatus(req.params.id, "confirmed");
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
