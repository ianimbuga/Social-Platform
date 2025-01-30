import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    axios.get('http://localhost:5555/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users.');
      });
  }, []);

  // Fetch posts
  useEffect(() => {
    axios.get('http://localhost:5555/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts.');
      });
  }, []);

  // Fetch comments
  useEffect(() => {
    axios.get('http://localhost:5555/comments')
      .then(response => {
        setComments(response.data);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setError('Failed to fetch comments.');
      });
  }, []);

  return (
    <div>
      <h1>Social Media Platform</h1>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Users Section */}
      <h2>Users</h2>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user.id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
          </div>
        ))
      ) : (
        <p>No users found or still loading...</p>
      )}

      {/* Posts Section */}
      <h2>Posts</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts found or still loading...</p>
      )}

      {/* Comments Section */}
      <h2>Comments</h2>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments found or still loading...</p>
      )}
    </div>
  );
}

export default App;
