const Contact = require("../models/contact");


const userContact = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const result = await contact.save()
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = userContact;