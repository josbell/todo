import React from 'react';
import { Todo } from './TodoList';
import { FaRegTrashCan } from "react-icons/fa6";

export interface TodoListItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleIsCompletedFlag: (todo: Todo) => void;
}

export default function TodoListItem({ todo, deleteTodo, toggleIsCompletedFlag }: TodoListItemProps) {
  return (
    <li 
      data-testid={`li-${todo._id}`}
      className={`flex items-center justify-between bg-white shadow-md p-4 rounded-lg mb-2 ${todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}
    >
      <div className="flex items-center">
        <input 
          type="checkbox" 
          checked={todo.isCompleted} 
          onChange={() => toggleIsCompletedFlag(todo)} 
          className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <span>{todo.title}</span>
      </div>
      <button 
        data-test-id={todo.title}
        onClick={() => deleteTodo(todo._id)} 
        className="text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <FaRegTrashCan className='text-xl' />
      </button>
    </li>
  );
}