import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/posts", {
      content,
      image_url: imageUrl,
      user_id: 1, // Default user for simplicity
    })
    .then(() => {
      setContent("");
      setImageUrl("");
    })
    .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>Create a Post</h3>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
