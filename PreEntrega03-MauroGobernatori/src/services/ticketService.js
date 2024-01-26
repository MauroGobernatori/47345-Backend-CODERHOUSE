import TicketDao from "../daos/ticketDao.js";
const ticketDao = new TicketDao();

class TicketService {
    async generateTicket(userId, cart){
        try{
            // console.log(cart);
            // const user = await userService.getById(userId);
            // console.log(user.email);
        }catch(error){
            throw new Error(error)
        }
    }
}

export const ticketService = new TicketService();