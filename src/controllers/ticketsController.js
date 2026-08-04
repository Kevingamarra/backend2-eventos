import ticketsService from "../services/tickets.service.js";
import eventsService from "../services/events.service.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await ticketsService.create(
      req.user.id,
      req.params.eid,
      req.body.quantity
    );

    res.status(201).json({
      status: "success",
      payload: ticket
    });
  } catch (error) {
    if (error.message === "Evento no encontrado") {
      return res.status(404).json({
        status: "error",
        message: error.message
      });
    }

    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

export const getMyTickets = async (req, res) => {
  try {
    const tickets = await ticketsService.getMyTickets(
      req.user.id
    );

    res.json({
      status: "success",
      payload: tickets
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const getEventTickets = async (req, res) => {
  try {
    const event = await eventsService.getById(
      req.params.eid
    );

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Evento no encontrado"
      });
    }

    if (
      req.user.role === "organizer" &&
      event.organizer._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        status: "error",
        message:
          "No tenés permisos para ver los tickets de este evento"
      });
    }

    const tickets =
      await ticketsService.getEventTickets(
        req.params.eid
      );

    res.json({
      status: "success",
      payload: tickets
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const cancelTicket = async (req, res) => {
  try {
    const ticket = await ticketsService.cancel(
      req.params.tid,
      req.user
    );

    res.json({
      status: "success",
      payload: ticket
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};
