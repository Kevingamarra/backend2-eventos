import eventsDAO from "../dao/events.dao.js";

class EventsRepository {
  async getAll(filters, options) {
    return await eventsDAO.getAll(filters, options);
  }

  async getById(id) {
    return await eventsDAO.getById(id);
  }

  async create(eventData) {
    return await eventsDAO.create(eventData);
  }

  async update(id, eventData) {
    return await eventsDAO.update(id, eventData);
  }

  async updateStatus(id, status) {
    return await eventsDAO.updateStatus(id, status);
  }

  async delete(id) {
    return await eventsDAO.delete(id);
  }
}

export default new EventsRepository();
