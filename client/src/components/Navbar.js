import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#1a1a2e",
      color: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#e94560",
    },
    linksContainer: {
      display: "flex",
      gap: "20px",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      padding: "8px 12px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    linkHover: {
      backgroundColor: "#e94560",
      color: "#fff",
    },
  };

  const handleHover = (e, isHover) => {
    if (isHover) {
      e.target.style.backgroundColor = styles.linkHover.backgroundColor;
      e.target.style.color = styles.linkHover.color;
    } else {
      e.target.style.backgroundColor = "transparent";
      e.target.style.color = "#fff";
    }
  };

  return (
    <div style={styles.navbar}>
      <h1 style={styles.title}>Social PlatForm</h1>
      <div style={styles.linksContainer}>
        <Link
          to="/"
          style={styles.link}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Users
        </Link>
        <Link
          to="/posts"
          style={styles.link}
          onMouseOver={(e) => handleHover(e, true)}
          onMouseOut={(e) => handleHover(e, false)}
        >
          Posts
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
