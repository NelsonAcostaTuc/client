import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Escuchar evento de conexión de usuarios
    socket.on('users', (connectedUsers) => {
      setUsers(connectedUsers);
    });

    // Solicitar lista de usuarios conectados
    socket.emit('getUsers');

    return () => {
      socket.off('users');
    };
  }, []);

  return (
    <div>
      <h2>Usuarios Conectados</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
