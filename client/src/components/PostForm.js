// src/components/PostForm.js
import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/posts', {
                title,
                content
            });

            if (response.status === 200) {
                // Clear form and reload posts
                setTitle('');
                setContent('');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <h3>Create a New Post</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    );
}

export default PostForm;
