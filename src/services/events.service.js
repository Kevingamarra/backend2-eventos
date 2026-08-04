import eventsRepository from "../repositories/events.repository.js";

class EventsService {
  async getAll() {
    return await eventsRepository.getAll();
  }

  async getById(id) {
    return await eventsRepository.getById(id);
  }

  async create(eventData) {
    return await eventsRepository.create(eventData);
  }

  async update(id, eventData) {
    return await eventsRepository.update(id, eventData);
  }

  async delete(id) {
    return await eventsRepository.delete(id);
  }
}

export default new EventsService();
