import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

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
      marginBottom: "20px",
      textAlign: "center",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    userInfo: {
      margin: "5px 0",
      fontSize: "16px",
      color: "#333",
    },
    username: {
      fontWeight: "bold",
      color: "#e94560",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Users</h2>
      {users.map((user) => (
        <div key={user.id} style={styles.card}>
          <p style={styles.userInfo}>
            <strong style={styles.username}>Username:</strong> {user.username}
          </p>
          <p style={styles.userInfo}>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
