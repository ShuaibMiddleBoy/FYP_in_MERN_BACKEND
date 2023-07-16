const Subscription = require("../models/subscription");


const subs = async (req, res) => {
    try {
        const subs= new Subscription(req.body);
        const result = await subs.save()
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = subs;