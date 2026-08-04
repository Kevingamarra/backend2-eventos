import crypto from "crypto";

import ticketsRepository from "../repositories/tickets.repository.js";
import eventsRepository from "../repositories/events.repository.js";
import usersRepository from "../repositories/users.repository.js";
import { sendTicketEmail } from "../utils/email.js";

class TicketsService {
  async create(userId, eventId, quantity) {
    const event = await eventsRepository.getById(eventId);

    if (!event) {
      throw new Error("Evento no encontrado");
    }

    if (event.status === "cancelled") {
      throw new Error("El evento está cancelado");
    }

    if (event.status === "finished") {
      throw new Error("El evento ya finalizó");
    }

    if (event.status !== "published") {
      throw new Error("El evento no está publicado");
    }

    if (!quantity || quantity <= 0) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    const existingTicket =
      await ticketsRepository.getActiveByUserAndEvent(
        userId,
        eventId
      );

    if (existingTicket) {
      throw new Error(
        "Ya tenés una inscripción activa para este evento"
      );
    }

    const activeTickets =
      await ticketsRepository.getConfirmedByEvent(eventId);

    const occupiedSeats = activeTickets.reduce(
      (total, ticket) => total + ticket.quantity,
      0
    );

    if (occupiedSeats + quantity > event.capacity) {
      throw new Error("No hay cupos suficientes");
    }

    const reservationCode = crypto.randomUUID();

    const ticket = await ticketsRepository.create({
      user: userId,
      event: eventId,
      quantity,
      reservationCode
    });

    const user = await usersRepository.getById(userId);

    try {
      await sendTicketEmail(
        user.email,
        event,
        reservationCode
      );
    } catch (error) {
      console.error(
        "Error enviando email:",
        error.message
      );
    }

    return ticket;
  }

  async getMyTickets(userId) {
    return await ticketsRepository.getByUser(userId);
  }

  async getEventTickets(eventId) {
    return await ticketsRepository.getByEvent(eventId);
  }

  async cancel(ticketId, user) {
    const ticket = await ticketsRepository.getById(ticketId);

    if (!ticket) {
      throw new Error("Ticket no encontrado");
    }

    if (ticket.status === "cancelled") {
      throw new Error("El ticket ya está cancelado");
    }

    if (
      user.role !== "admin" &&
      ticket.user._id.toString() !== user.id
    ) {
      throw new Error("No tenés permisos para cancelar este ticket");
    }

    return await ticketsRepository.update(ticketId, {
      status: "cancelled",
      cancelledAt: new Date()
    });
  }
}

export default new TicketsService();
