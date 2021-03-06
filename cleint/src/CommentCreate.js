import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({postId, fetchPosts}) => {
    const [content, setContent] = useState('');

    /**
     * Create new comment for the post
     * @param {any} event 
     */
    const createComment = (event) => {
        event.preventDefault();

        axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        }).finally(() => {
            fetchPosts();
        });
        
        setContent('');
    }
    
    return <div>
        <form onSubmit={createComment}>
            <div className="form-group">
                <label>new Comment</label>
                <input 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className="form-control" 
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>;
}