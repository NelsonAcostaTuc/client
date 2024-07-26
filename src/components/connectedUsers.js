import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');  // Conectar a Socket.io

const ConnectedUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('usersUpdated', (connectedUsers) => {
      setUsers(connectedUsers);
    });

    return () => {
      socket.off('usersUpdated');
    };
  }, []);

  return (
    <div className="connected-users">
      <h2>Usuarios Conectados</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConnectedUsers;
