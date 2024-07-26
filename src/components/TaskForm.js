import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api';

const TaskForm = ({ task, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDescription(task.description);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      await updateTask(task._id, { name, description });
    } else {
      await createTask({ name, description });
    }
    onSave();
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">{task ? 'Actualizar' : 'Crear'} Tarea</button>
    </form>
  );
};

export default TaskForm;
