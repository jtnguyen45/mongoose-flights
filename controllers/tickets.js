const Flight = require('../models/flights');
const Ticket = require('../models/tickets');

module.exports = {
    new: newTicket,
    create
}

async function newTicket(req, res) {
    const flightId = req.params.id
    res.render('tickets/new', {title: 'Add Ticket', flightId});
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    try {
        const ticket = await Ticket.create({...req.body, "flight": req.params.id});
        flight.tickets.push(ticket._id);
        await flight.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/flights/${flight._id}`);
}