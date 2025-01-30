import React, { useState } from 'react';
import axios from 'axios';

function Post() {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  const createPost = () => {
    axios.post('http://localhost:5000/posts', { content, user_id: 1 }) // Example user_id = 1
      .then(response => {
        setPosts([...posts, response.data]);
        setContent('');
      })
      .catch(error => console.log(error));
  };

  const deletePost = (postId) => {
    axios.delete(`http://localhost:5000/posts/${postId}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Create Post</h2>
      <textarea
        placeholder="Write your post"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={createPost}>Create Post</button>

      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.id)}>Delete Post</button>
        </div>
      ))}
    </div>
  );
}

export default Post;
