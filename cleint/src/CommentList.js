import React, { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ postId }) => {
    const [comments, setComments] = useState([]);

    // get comments
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`)

        setComments(res.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    const commentsContent = comments.map(comment => {
        return <li key={comment.id}>
            {comment.content}
        </li>
    })

    return <ul>
        {commentsContent}
    </ul>
}