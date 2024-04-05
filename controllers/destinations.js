const Flight = require('../models/flights');

module.exports = {
    create
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body);
    try {
        await flight.save();
    } catch (error) {
        console.log(error);
    }
    res.redirect(`/flights/${flight._id}`);
}