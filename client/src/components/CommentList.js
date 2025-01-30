import React, { useEffect, useState } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts/${postId}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, [postId]);

  const styles = {
    container: {
      marginTop: "20px",
      padding: "10px",
      borderTop: "1px solid #ddd",
    },
    title: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#444",
      marginBottom: "10px",
    },
    commentBox: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f2f2f2",
      padding: "10px",
      borderRadius: "10px",
      marginBottom: "10px",
    },
    profilePicture: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#ddd",
      marginRight: "10px",
    },
    commentText: {
      fontSize: "14px",
      color: "#333",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.container}>
      <h4 style={styles.title}>Comments:</h4>
      {comments.map((comment) => (
        <div key={comment.id} style={styles.commentBox}>
          {/* Placeholder for a profile picture */}
          <div style={styles.profilePicture}></div>
          <p style={styles.commentText}>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
