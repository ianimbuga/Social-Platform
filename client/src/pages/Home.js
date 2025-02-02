import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const userId = localStorage.getItem('user_id');

  if(!userId){
    window.location.href = "./login";
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        const postsWithComments = response.data.map(post => ({
          ...post,
          comments: Array.isArray(post.comments) ? post.comments : [],
        }));

        // Sort posts by post ID in descending order (latest post first)
        const sortedPosts = postsWithComments.sort((a, b) => b.id - a.id);
        setPosts(sortedPosts);
      } catch (err) {
        console.error('Error fetching posts', err);
      }
    };
    fetchPosts();
  }, []);

  const handleCommentSubmit = async (postId, userId) => {
    if (!newComment.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/comments', {
        content: newComment,
        user_id: userId,
        post_id: postId,
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
      setNewComment('');
      setCommentError('');
    } catch (err) {
      console.error('Error creating comment', err);
      setCommentError('Error submitting comment');
    }
  };

  const handlePostSubmit = async () => {
    if (!newPostContent.trim()) {
      alert('Post content cannot be empty');
      return;
    }

    const postData = {
      content: newPostContent,
      user_id: userId,
      image_url: newPostImage || '',
    };

    try {
      const response = await axios.post('http://localhost:5000/posts', postData);
      setPosts([response.data, ...posts]); // Add the new post at the top of the list
      setShowPostModal(false); // Close the modal
      window.location.href = "/";
    } catch (err) {
      console.error('Error creating post', err);
      alert('Error submitting post');
    }
  };

  return (
    <div className="home-container">
      <h2 className="title">Latest Posts</h2>
      <button onClick={() => setShowPostModal(true)} className="create-post-btn">
        Create Post
      </button>
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-username">Posted by: {post.poster_username}</p> {/* Display the poster's username */}
            <p className="post-content">{post.content}</p>
            {post.image_url && <img className="post-image" src={post.image_url} alt="Post" />}
            <div className="comments-section">
              <h4 className="comments-title">Comments:</h4>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <p className="comment-text">
                      <strong className="comment-username">{comment.username}: </strong>
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}
              <textarea
                className="comment-input"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
              {commentError && <p className="error-message">{commentError}</p>}
              <button className="submit-btn" onClick={() => handleCommentSubmit(post.id, userId)}>
                Submit Comment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for creating post */}
      {showPostModal && (
        <div className="post-modal">
          <div className="post-modal-content">
            <h3>Create New Post</h3>
            <textarea
              className="post-input"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <input
              type="text"
              className="post-input"
              placeholder="Image URL (optional)"
              value={newPostImage}
              onChange={(e) => setNewPostImage(e.target.value)}
            />
            <button onClick={handlePostSubmit} className="submit-btn">
              Submit Post
            </button>
            <button onClick={() => setShowPostModal(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
