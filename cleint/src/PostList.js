import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const result = await axios.get("http://localhost:4002/posts");

        setPosts(result.data);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const renderedPosts = Object.values(posts).map(post => {
        return <div 
            className="card" 
            style={{with: '30%', marginBottom: "30px"}} 
            key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList  comments={post.comments}/>
                    <CommentCreate fetchPosts={fetchPosts} postId={post.id}/>
                </div>
        </div>
    })
    
    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}    
    </div>
}