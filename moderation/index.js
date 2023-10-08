const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const {type, data} = req.data

    if (type === "CommentCreated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'
    }

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommnentCreated',
        data: {
            id: data.id,
            postId: data.postId,
            content: data.content,
            status
        }
    })
    res.send({})
})

app.listen(4003, () => {
    console.log('Listening on 4003');
})