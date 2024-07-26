import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../api';
import TaskForm from './TaskForm';
import { io } from 'socket.io-client';
import axios from 'axios';
import Modal from 'react-modal';

const socket = io('http://localhost:5000'); // Conectar a Socket.io

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [email, setEmail] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();

    // Escuchar eventos de Socket.io
    socket.on('taskCreated', (task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (id) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
    setSelectedTask(null);
    setModalIsOpen(false);
  };

  const handleShare = async (id) => {
    await axios.post('http://localhost:5000/api/tasks/share', { id, email });
    setEmail('');
  };

  const openModal = () => {
    setSelectedTask(null);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <button onClick={openModal}>Crear Tarea</button>
      <table className="task-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
            <th>Compartir</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => handleEdit(task)}>Editar</button>
                <button onClick={() => handleDelete(task._id)}>Eliminar</button>
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={() => handleShare(task._id)}>Compartir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear/Editar Tarea"
      >
        <TaskForm task={selectedTask} onSave={handleSave} />
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default TaskList;
