import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [currentTask, setCurrentTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, id: Date.now() }]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setIsEditing(id);
    setCurrentTask(text);
  };

  const saveTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: currentTask } : task)));
    setIsEditing(null);
    setCurrentTask('');
  };

  return (
    <div className="container">
      <div className="todo-list">
        <h1>To-Do List</h1>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ listStyleType: 'disc' }}>
              {isEditing === task.id ? (
                <>
                  <input
                    type="text"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                  />
                  <button onClick={() => saveTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  {task.text}
                  <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
