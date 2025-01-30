import React, { useState } from 'react';
import axios from 'axios';

function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);

  const createUser = () => {
    axios.post('http://localhost:5000/users', { username, email, password })
      .then(response => {
        setUsers([...users, response.data]);
        setUsername('');
        setEmail('');
        setPassword('');
      })
      .catch(error => console.log(error));
  };

  const deleteUser = (userId) => {
    axios.delete(`http://localhost:5000/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Create User</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>

      <h3>Users List</h3>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.username} - {user.email}</p>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default User;
