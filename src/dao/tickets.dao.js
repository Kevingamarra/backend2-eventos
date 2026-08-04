import Ticket from "../models/Ticket.js";

class TicketsDAO {
  async create(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getById(id) {
    return await Ticket.findById(id)
      .populate("user", "first_name last_name email")
      .populate("event");
  }

  async getByUser(userId) {
    return await Ticket.find({
      user: userId
    }).populate(
      "event",
      "title date location"
    );
  }

  async getByEvent(eventId) {
    return await Ticket.find({
      event: eventId
    }).populate(
      "user",
      "first_name last_name email"
    );
  }

  async getActiveByUserAndEvent(userId, eventId) {
    return await Ticket.findOne({
      user: userId,
      event: eventId,
      status: {
        $ne: "cancelled"
      }
    });
  }

  async getConfirmedByEvent(eventId) {
    return await Ticket.find({
      event: eventId,
      status: {
        $ne: "cancelled"
      }
    });
  }

  async update(id, data) {
    return await Ticket.findByIdAndUpdate(
      id,
      data,
      {
        new: true
      }
    );
  }
}

export default new TicketsDAO();
