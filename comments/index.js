const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json())

const commentsByPostId = {};

// Get comments of post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create comment
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex'); 
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});

    commentsByPostId[req.params.id] = comments;

     // Emit to events
    await axios.post('http://localhost:4005/events', {
        type: "CommentCreated",
        data : {
            id: commentId,
            content,
            postId: req.params.id,
        }
    });

    res.status(201).send(comments)
});

app.post("/events", (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
})

app.listen(4001, () => {
    console.log("Listening on 4001");
})