import { TicketModel } from './models/ticketModel.js';

export default class TicketDao {
    async createTicket(ticket){
        try{
            return await TicketModel.create(ticket)
        }catch(error){
            throw new Error(error)
        }
    }
}