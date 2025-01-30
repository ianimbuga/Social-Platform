import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLike = (postId) => {
    axios
      .post("http://localhost:5000/likes", { post_id: postId, user_id: 1 })
      .then(() => {
        setLikes({ ...likes, [postId]: (likes[postId] || 0) + 1 });
      })
      .catch((error) => console.error(error));
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "20px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    cardContent: {
      padding: "15px",
    },
    image: {
      width: "100%",
      height: "auto",
    },
    button: {
      backgroundColor: "#e94560",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "10px 15px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      marginTop: "10px",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#d8344a",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={styles.card}>
          <div style={styles.cardContent}>
            <p>
              <strong>Content:</strong> {post.content}
            </p>
          </div>
          {post.image_url && <img src={post.image_url} alt="Post" style={styles.image} />}
          <div style={styles.cardContent}>
            <button
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={() => handleLike(post.id)}
            >
              Like ({likes[post.id] || 0})
            </button>
            <CommentList postId={post.id} />
            <CommentForm postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
