import React, { useState } from 'react';
import './TodoItem.css'; // Import your CSS file

const TodoItem = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newRecurrence, setNewRecurrence] = useState(task.recurrence);
  const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);

  // Function to calculate the next occurrence date based on recurrence type
  const calculateNextOccurrence = (recurrence) => {
    const now = new Date();
    let nextDate = new Date();

    switch (recurrence) {
      case 'daily':
        nextDate.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        nextDate.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(now.getMonth() + 1);
        break;
      case 'yearly':
        nextDate.setFullYear(now.getFullYear() + 1);
        break;
      default:
        return null; // No recurrence
    }

    return nextDate.toISOString(); // Return as ISO string for consistency
  };

  const handleUpdate = () => {
    const nextOccurrence = calculateNextOccurrence(newRecurrence); // Calculate next occurrence
    updateTask(task.id, newText, newRecurrence, nextOccurrence); // Pass nextOccurrence to updateTask
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    setIsMarkedForDeletion(true);
    // Set a timeout to delete the task after 2 seconds
    setTimeout(() => {
      deleteTask(task.id);
    }, 2000); // Change to 3000 for 3 seconds
  };

  // Function to format the next occurrence date
  const formatNextOccurrence = (nextOccurrence) => {
    if (nextOccurrence) {
      const date = new Date(nextOccurrence);
      return date.toLocaleDateString();
    }
    return 'No upcoming date'; // Fallback if nextOccurrence is undefined
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        onChange={handleCheckboxChange} // Call handleCheckboxChange on checkbox change
      />
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <select
            value={newRecurrence}
            onChange={(e) => setNewRecurrence(e.target.value)}
          >
            <option value="none">No Recurrence</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <span style={{ textDecoration: isMarkedForDeletion ? 'line-through' : 'none' }}>
          {task.text} 
          {task.recurrence !== 'none' && (
            <span className="recurrence-info">
              (Next: {formatNextOccurrence(task.next_Occurrence)})
            </span>
          )}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
};

export default TodoItem;