import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";

export interface Todo {
  _id: string,
  title: string;
}

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((data: Todo[]) => setTodoList(data))
      .catch( () => setTodoList([]) );
    }, []);
  
  const todoListHTML = todoList?.map( todo => (
    <TodoListItem key={`li-${todo._id}`} todo={todo} deleteTodo={deleteTodo} />
  ))

  function addTodo() {
    if (inputValue) {
      const newTodo = { title: inputValue }
      
      fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      })
      .then(response => {
        return response.json()
      })
      .then((data: Todo) => {              
        setTodoList([...todoList, data])
        setInputValue('');
      })
      .catch( error => {
        alert('Failed to create todo. Sorry bro. We kinda winging it out here')
        console.error(error)
      })
    }
  }

  async function deleteTodo(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.message) {
        setTodoList(prevTodos => prevTodos.filter(todo => todo._id !== id));
        alert(data.message);
      } else {
        throw new Error(`Error: No data received`);
      }

    } catch (error) {
      console.error('Error deleting todo:', error);
      handleError();
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleError() {
    alert('todo was not deleted, try again later')
  }

  return (
    <>
      <h1 data-testid="title">TODO List</h1>
      <div className="flex w-full justify-evenly">
        <input type="text" data-testid="input-add"  value={inputValue} onChange={onInputChange} className="mx-1 py-1 flex-grow"></input>
        <button data-testid="button-add" onClick={addTodo}>Add Todo</button>
      </div>
      <ul data-testid="todo-list" className="list-none">
        { todoListHTML }
      </ul>
    </>
  )
}

export default TodoList;