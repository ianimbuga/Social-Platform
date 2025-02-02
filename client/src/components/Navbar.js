import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Check if the user is authenticated by checking user_id in localStorage
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Remove user_id from localStorage to log the user out
    localStorage.removeItem('user_id');
    setIsAuthenticated(false);
    history.push('/login');  // Redirect to the login page after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">SocialMedia</Link>
      </div>
      <div className="links">
        {isAuthenticated ? (
          <>
            <Link to="/">Home</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
