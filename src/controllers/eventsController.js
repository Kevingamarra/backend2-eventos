import eventsService from "../services/events.service.js";

export const getEvents = async (req, res) => {
  try {
    const events = await eventsService.getAll();

    res.json({
      status: "success",
      payload: events
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = await eventsService.create({
      ...req.body,
      organizer: req.user.id
    });

    res.status(201).json({
      status: "success",
      payload: event
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await eventsService.getById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: "error",
        message: "Evento no encontrado"
      });
    }

    if (
      req.user.role === "organizer" &&
      event.organizer.toString() !== req.user.id
    ) {
      return res.status(403).json({
        status: "error",
        message: "No tenés permisos para modificar este evento"
      });
    }

    const updatedEvent = await eventsService.update(
      req.params.id,
      req.body
    );

    res.json({
      status: "success",
      payload: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
