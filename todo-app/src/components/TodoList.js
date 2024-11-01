import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, toggleCompleted, deleteTask, updateTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <TodoItem 
          key={task.id} 
          task={task} 
          toggleCompleted={toggleCompleted} 
          deleteTask={deleteTask} 
          updateTask={updateTask} // Ensure this is passed correctly
        />
      ))}
    </div>
  );
};

export default TodoList;