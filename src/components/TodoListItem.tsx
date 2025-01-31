import React, { useState } from 'react'
import { Todo } from './TodoList'

export interface TodoListItemProps {
    todo: Todo,
    deleteTodo: (id: string) => void,
    toggleIsCompletedFlag: (todo: Todo) => void
}


export default function TodoListItem({todo, deleteTodo, toggleIsCompletedFlag}: TodoListItemProps) {
  return (
    <li 
      data-testid={`li-${todo._id}`}
      className={`bg-gray-100 p-4 rounded m-2 ${todo.isCompleted ? 'line-through' : ''}`}
    >
      <input type="checkbox" checked={todo.isCompleted} onChange={() => toggleIsCompletedFlag(todo)}/>
      {todo.title}
      <button onClick={ () => deleteTodo(todo._id) }>Delete</button>
    </li>
  )
}