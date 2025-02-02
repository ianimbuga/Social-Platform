import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p><strong>User {comment.user_id}:</strong> {comment.content}</p>
    </div>
  );
};

export default Comment;
