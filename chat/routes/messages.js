const Joi = require("joi");
var express = require('express');
var router = express.Router();
var [getMessages, insertMessage, updateMessage, deleteMessage, findMessage] = require('../controllers/messages');

router.get('/', async function (req, res, next) {
    const messages = await getMessages();
    res.send(messages);
});

router.get('/:ts', function (req, res, next) {
    const tsMessage = findMessage(req.params.ts);
    res.send(tsMessage);
});

router.post('/', async function (req, res, next) {
    const { error } = validateMessage(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const newMessage = await insertMessage(req.body);
    res.send(newMessage);
});


router.put('/', async function (req, res, next) {
    const { error } = validateMessage(req.body);

    if (error) {
        return res.status(400).send(error);
    }

    const newMessage = updateMessage(req.body.ts, req.body.message);
    res.send(newMessage);
});

router.delete('/:ts', function (req, res, next) {
    const deletedMessage = deleteMessage(req.params.ts);
    res.send(deletedMessage);
});

const validateMessage = (message) => {
    const schema = Joi.object({
        ts: Joi.string().required(),
        message: Joi.string().min(5).required(),
        author: Joi.string().required()
    });

    return schema.validate(message);
};

module.exports = router;