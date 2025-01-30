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
      .then(() => {
        setPosts(posts.filter(post => post.id !== postId));
      })
      .catch(error => console.log(error));
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    createSection: {
      marginBottom: '30px',
      textAlign: 'center',
    },
    textarea: {
      width: '100%',
      height: '100px',
      borderRadius: '10px',
      border: '1px solid #ddd',
      padding: '10px',
      fontSize: '16px',
      resize: 'none',
    },
    button: {
      backgroundColor: '#e94560',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 15px',
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#d8344a',
    },
    postCard: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    deleteButton: {
      backgroundColor: '#ff6b6b',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    deleteButtonHover: {
      backgroundColor: '#ff4a4a',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.createSection}>
        <h2>Create Post</h2>
        <textarea
          placeholder="Write your post"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={styles.textarea}
        />
        <br />
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          onClick={createPost}
        >
          Create Post
        </button>
      </div>

      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} style={styles.postCard}>
          <p>{post.content}</p>
          <button
            style={styles.deleteButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.deleteButton.backgroundColor)}
            onClick={() => deletePost(post.id)}
          >
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
}

export default Post;
