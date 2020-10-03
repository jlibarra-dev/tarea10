const mdbconn = require('../lib/utils/mongo.js');

function getMessages() {
    return mdbconn.conn().then((client) => {
        return client.db('messages').collection('messages').find({}).toArray();
    });
}

function insertMessage(message) {
    return mdbconn.conn().then((client) => {
        return client.db('messages').collection('messages').insertOne(message); // Si no se provee un ID, este será generado automáticamente
    });
}

function updateMessage(paramTs, newMessage) {
    return mdbconn.conn().then((client) => {
        const filter = { ts: paramTs };
        const updateDocument = {
            $set: {
                message: newMessage,
            },
        };
        return client.db('messages').collection('messages').updateOne(filter, updateDocument);
    });
}

function deleteMessage(paramTs) {
    return mdbconn.conn().then((client) => {
        const filter = { ts: paramTs };
        console.log(filter);
        return client.db('messages').collection('messages').deleteOne(filter);
    });
}

function findMessage(paramTs) {
    return mdbconn.conn().then((client) => {
        const filter = { ts: paramTs };
        return client.db('messages').collection('messages').findOne(filter);
    });
}

module.exports = [getMessages, insertMessage, updateMessage, deleteMessage, findMessage];