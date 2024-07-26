import React from 'react';
import TaskList from '../components/TaskList';
import UserList from '../components/UserList';
import Notification from '../components/Notification';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <TaskList />
      </div>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <UserList />
      </div>
      <div style={{ flex: 1 }}>
        <Notification />
      </div>
    </div>
  );
};

export default Home;
