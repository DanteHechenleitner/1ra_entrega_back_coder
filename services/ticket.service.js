import ticketSchema from "../dao/models/ticketSchema.js";

class TicketService{
    static async createTicket(code, amount, purchaser){
        try{
            const ticket = new ticketSchema({
                code,
                amount,
                purchaser,
            });
            await ticket.save();
            return ticket;
        } catch(error){
            console.error(error)
            throw new Error('Failed to create ticket');
        }
    }
}

export default TicketService;