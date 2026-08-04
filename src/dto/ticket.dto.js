const ticketDTO = (ticket) => ({
  id: ticket._id,
  status: ticket.status,
  quantity: ticket.quantity,
  reservationCode: ticket.reservationCode,
  cancelledAt: ticket.cancelledAt,
  createdAt: ticket.createdAt,
  event: ticket.event
    ? {
        id: ticket.event._id,
        title: ticket.event.title,
        date: ticket.event.date,
        location: ticket.event.location
      }
    : null,
  user: ticket.user
    ? {
        id: ticket.user._id,
        first_name: ticket.user.first_name,
        last_name: ticket.user.last_name,
        email: ticket.user.email
      }
    : null
});

export default ticketDTO;
