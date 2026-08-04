import eventsRepository from "../repositories/events.repository.js";

class EventsService {
  async getAll(query) {
    const filters = {};

    if (query.status) {
      filters.status = query.status;
    }

    if (query.category) {
      filters.category = query.category;
    }

    if (query.location) {
      filters.location = query.location;
    }

    if (query.dateFrom || query.dateTo) {
      filters.date = {};

      if (query.dateFrom) {
        filters.date.$gte = new Date(query.dateFrom);
      }

      if (query.dateTo) {
        filters.date.$lte = new Date(query.dateTo);
      }
    }

    const options = {
      page: Number(query.page) || 1,
      limit: Number(query.limit) || 10,
      sort: query.sort || "date"
    };

    return await eventsRepository.getAll(filters, options);
  }

  async getById(id) {
    return await eventsRepository.getById(id);
  }

  async create(eventData) {
    if (new Date(eventData.date) < new Date()) {
      throw new Error("La fecha del evento no puede ser pasada");
    }

    if (eventData.capacity <= 0) {
      throw new Error("La capacidad debe ser mayor a 0");
    }

    if (eventData.price < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    return await eventsRepository.create(eventData);
  }

  async update(id, eventData) {
    const event = await eventsRepository.getById(id);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    if (event.status === "cancelled") {
      throw new Error("No se puede modificar un evento cancelado");
    }

    if (
      eventData.capacity !== undefined &&
      eventData.capacity <= 0
    ) {
      throw new Error("La capacidad debe ser mayor a 0");
    }

    if (
      eventData.price !== undefined &&
      eventData.price < 0
    ) {
      throw new Error("El precio no puede ser negativo");
    }

    return await eventsRepository.update(id, eventData);
  }

  async updateStatus(id, status) {
    const event = await eventsRepository.getById(id);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    if (event.status === "cancelled") {
      throw new Error("No se puede cambiar el estado de un evento cancelado");
    }

    if (
      status === "published" &&
      (event.status === "finished" || event.status === "cancelled")
    ) {
      throw new Error("No se puede publicar un evento finalizado o cancelado");
    }

    return await eventsRepository.updateStatus(id, status);
  }

  async delete(id) {
    return await eventsRepository.delete(id);
  }
}

export default new EventsService();
