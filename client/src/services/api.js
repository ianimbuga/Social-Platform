import axios from 'axios';

// Base URL for the Flask API
const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your actual API URL if needed
});

// Function to fetch posts
export const fetchPosts = async () => {
  try {
    const response = await API.get('/posts');
    return response.data; // Return posts data
  } catch (err) {
    console.error('Error fetching posts:', err);
    throw err; // Re-throw error for handling elsewhere
  }
};

// Function to fetch comments for a specific post
export const fetchComments = async (postId) => {
  try {
    const response = await API.get(`/comments?post_id=${postId}`);
    return response.data; // Return comments data
  } catch (err) {
    console.error('Error fetching comments:', err);
    throw err; // Re-throw error for handling elsewhere
  }
};

// Function to create a new comment
export const createComment = async (data) => {
  try {
    const response = await API.post('/comments', data);
    return response.data; // Return the new comment
  } catch (err) {
    console.error('Error creating comment:', err);
    throw err; // Re-throw error for handling elsewhere
  }
};

// Function to create a post
export const createPost = async (data) => {
  try {
    const response = await API.post('/posts', data);
    return response.data; // Return the new post
  } catch (err) {
    console.error('Error creating post:', err);
    throw err; // Re-throw error for handling elsewhere
  }
};

// Function to handle user authentication (login/signup)
export const loginUser = async (data) => {
  try {
    const response = await API.post('/login', data);
    return response.data; // Return login success data
  } catch (err) {
    console.error('Error during login:', err);
    throw err;
  }
};

export const signupUser = async (data) => {
  try {
    const response = await API.post('/signup', data);
    return response.data; // Return signup success data
  } catch (err) {
    console.error('Error during signup:', err);
    throw err;
  }
};
