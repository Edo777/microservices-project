import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [title, setTitle] = useState('');

    /**
     * Create new post
     * @param {any} event 
     */
    const createPost = (event) => {
        event.preventDefault();

        axios.post("http://localhost:4000/posts", {
            title
        });
        
        setTitle('');
    }
    
    return <div>
        <form onSubmit={createPost}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    className="form-control" 
                />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>;
}