import React, { useState } from 'react';

const AddTaskForm = ({ addTask }) => {
  const [text, setText] = useState('');
  const [recurrence, setRecurrence] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      addTask(text, recurrence);
      setText('');
      setRecurrence('none');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
        <option value="none">No Recurrence</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;