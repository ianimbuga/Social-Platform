import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/comments", {
        content,
        user_id: 1, // Replace with dynamic user ID if needed
        post_id: postId,
      })
      .then(() => setContent(""))
      .catch((error) => console.error(error));
  };

  const styles = {
    form: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
      borderTop: "1px solid #ddd",
      paddingTop: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
      marginRight: "10px",
      backgroundColor: "#f9f9f9",
    },
    button: {
      backgroundColor: "#3897f0",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#287dc1",
    },
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        style={styles.input}
      />
      <button
        type="submit"
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
