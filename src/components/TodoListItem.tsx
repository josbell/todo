import React from 'react'
import { Todo } from './TodoList'

export interface TodoListItemProps {
    todo: Todo,
    deleteTodo: (id: string) => void
}

export default function TodoListItem({todo, deleteTodo}: TodoListItemProps) {
  return (
    <li 
      data-testid={`li-${todo._id}`}
      className="bg-gray-100 p-4 rounded m-2"
    >
      {todo.title}
      <button onClick={ () => deleteTodo(todo._id) }>Delete</button>
    </li>
  )
}