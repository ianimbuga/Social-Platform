import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';  // Use useHistory for react-router-dom v5

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();  // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    if (type === 'signup') data.username = username;

    try {
      const response = await axios.post(`http://localhost:5000/${type}`, data);
      if (response.status === 201 || response.status === 200) {
        const { user_id } = response.data;
        localStorage.setItem('user_id', user_id);  // Store user_id in localStorage
        alert('Success!');
        history.push('/');  // Navigate to the homepage using history.push()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">{type === 'signup' ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <input
              type="text"
              className="auth-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">{type === 'signup' ? 'Sign Up' : 'Log In'}</button>
        </form>
        <p className="auth-footer">
          {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
          <a href={type === 'signup' ? '/login' : '/signup'} className="auth-link">
            {type === 'signup' ? 'Log In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
