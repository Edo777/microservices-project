const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};
// QUICK EXAMPLE
posts === {
    'aaaa' : {
        id : 'aaaa',
        title: 'post title',
        comments: [
            {id: 'bbbb', content: 'comment!!!'}
        ]
    }
}

/** All posts and comments */
app.get('/posts', (req, res) => {
    res.send(posts);
})

/** Set posts and comments by action type */
app.post('/events', (req, res) => {
    const {type, data} = req.body;

    if(type === "PostCreated") {
        const {id, title} = data;

        posts[id] = {id, title, comments : []};
    }

    if(type === "CommentCreated") {
        const {id, content, postId} = data;

        const post = posts[postId];
        post.comments.push({id, content});
    }

    res.send({});
})

app.listen(4002, () => {
    console.log("Listening to 4002")
})