import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";

export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

function TodoList() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/todo')
      .then(response => response.json())
      .then((data: Todo[]) => setTodoList(data))
      .catch(() => setTodoList([]));
  }, []);

  const todoListHTML = todoList?.map(todo => (
    <TodoListItem 
      key={`li-${todo._id}`} 
      todo={todo} 
      deleteTodo={deleteTodo} 
      toggleIsCompletedFlag={toggleIsCompletedFlag}
    />
  ));

  function addTodo() {
    if (inputValue) {
      const newTodo: Omit<Todo, "_id"> = { 
        title: inputValue, 
        isCompleted: false 
      };
      
      fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
      })
      .then(response => response.json())
      .then((data: Todo) => {              
        setTodoList(prevTodos => [...prevTodos, data]);
        setInputValue('');
      })
      .catch(error => {
        alert('Failed to create todo. Sorry bro. We kinda winging it out here');
        console.error(error);
      });
    }
  }

  async function toggleIsCompletedFlag(todo: Todo) {
    const { _id, ...rest } = todo; // Removing _id to avoid mutating in DB
    const updatedTodo = { ...rest, isCompleted: !todo.isCompleted };

    try {
      if (!todo) return;
      const response = await fetch(`http://localhost:3000/todo/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data: Todo = await response.json();
      if (data && data.isCompleted === updatedTodo.isCompleted) {
        setTodoList(prevTodos => prevTodos.map(prevTodo => {
          if (prevTodo._id === _id) {
            return { ...prevTodo, isCompleted: updatedTodo.isCompleted };
          }
          return prevTodo;
        }));
      } else {
        throw new Error(`Error: Data not received or mutated`);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      handleUpdateError();
    }
  }

  async function deleteTodo(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.message) {
        setTodoList(prevTodos => prevTodos.filter(todo => todo._id !== id));
      } else {
        throw new Error(`Error: No data received`);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      handleDeleteError();
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleDeleteError() {
    alert('Todo was not deleted, try again later');
  }

  function handleUpdateError() {
    alert('Todo was not updated, try again later');
  }

  return (
    <>
      <h1 data-testid="title" className="text-2xl font-bold mb-4">TODO List</h1>
      <div className="flex w-full justify-evenly mb-4">
        <input 
          type="text" 
          data-testid="input-add" 
          value={inputValue} 
          onChange={onInputChange} 
          className="mx-1 py-2 px-4 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new todo"
        />
        <button 
          data-testid="button-add" 
          onClick={addTodo} 
          className="ml-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </div>
      <ul data-testid="todo-list" className="list-none">
        {todoListHTML}
      </ul>
    </>
  );
}

export default TodoList;