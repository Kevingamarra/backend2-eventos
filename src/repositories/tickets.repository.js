import ticketsDAO from "../dao/tickets.dao.js";

class TicketsRepository {
  async create(ticketData) {
    return await ticketsDAO.create(ticketData);
  }

  async getById(id) {
    return await ticketsDAO.getById(id);
  }

  async getByUser(userId) {
    return await ticketsDAO.getByUser(userId);
  }

  async getByEvent(eventId) {
    return await ticketsDAO.getByEvent(eventId);
  }

  async getActiveByUserAndEvent(userId, eventId) {
    return await ticketsDAO.getActiveByUserAndEvent(
      userId,
      eventId
    );
  }

  async getConfirmedByEvent(eventId) {
    return await ticketsDAO.getConfirmedByEvent(
      eventId
    );
  }

  async update(id, data) {
    return await ticketsDAO.update(id, data);
  }
}

export default new TicketsRepository();
