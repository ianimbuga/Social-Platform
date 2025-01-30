import React, { useState } from 'react';
import axios from 'axios';

function Comment() {
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

  const createComment = (postId) => {
    axios.post('http://localhost:5000/comments', { content, user_id: 1, post_id: postId }) // Example user_id = 1
      .then(response => {
        setComments([...comments, response.data]);
        setContent('');
      })
      .catch(error => console.log(error));
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:5000/comments/${commentId}`)
      .then(response => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Create Comment</h2>
      <textarea
        placeholder="Write your comment"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={() => createComment(1)}>Create Comment</button> {/* Example post_id = 1 */}

      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <button onClick={() => deleteComment(comment.id)}>Delete Comment</button>
        </div>
      ))}
    </div>
  );
}

export default Comment;
