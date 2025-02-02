import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';  // Import the Comment component
// import './Post.css';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments?post_id=${post.id}`);
        setComments(response.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [post.id]);

  return (
    <div className="post">
      <div className="post-header">
        <h3>User: {post.user_id}</h3> {/* Display user info based on user_id */}
      </div>
      <p>{post.content}</p>
      {post.image_url && <img src={post.image_url} alt="Post image" />}
      
      {/* Render comments */}
      <div className="comments-section">
        <h4>Comments:</h4>
        {comments.length > 0 ? (
          comments.map(comment => <Comment key={comment.id} comment={comment} />)
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
