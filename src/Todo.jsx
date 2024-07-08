import React, { useState } from 'react';
import './App.css';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      if (isEditing) {
        const updatedTasks = tasks.map((t, index) =>
          index === currentTaskIndex ? { ...t, title, description } : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, { title, description, completed: false }]);
      }
      setTitle('');
      setDescription('');
    }
  };

  const editTask = (index) => {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <div className="List">
        <h2>To-Do List</h2>
        <div className="row">
          <input
            type="text"
            id="input-title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="input-description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTask}>{isEditing ? 'Update' : 'Add'}</button>
        </div>
        <ul id="tasklist">
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : 'not-completed'}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-buttons">
                <button
                  className="status-btn"
                  onClick={() => toggleTaskCompletion(index)}
                >
                  {task.completed ? 'Not Completed' : 'Completed'}
                </button>
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    editTask(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTask(index);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
