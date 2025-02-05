import React, { useState, useEffect } from "react";
import TodoListItem from "./TodoListItem";
import Confetti from "react-confetti"
import { getHttp, postHttp, patchHttp, deleteHttp } from "../services/httpService";

export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
}

function TodoList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [congrats, setCongrats] = useState<boolean>(false)

  useEffect(() => {
    if (congrats && todoList.some( todo => !todo.isCompleted)){
      setCongrats(false)
    } else if (!congrats && todoList.length && todoList.every( todo => todo.isCompleted )) {
      setCongrats(true)
    }
  }, [todoList, congrats])

  useEffect(() => {
    getHttp<Todo[]>('todo')
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
      
      postHttp<Todo>('todo', newTodo)
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

  function updateCongrats(updatedTodo: Todo) {
    const allCompleted = updatedTodo.isCompleted && todoList.filter( todo => todo._id !== updatedTodo._id).every( todo => todo.isCompleted )
    if (allCompleted) {
      setCongrats(true)
    }   
  }

  async function toggleIsCompletedFlag(todo: Todo) {
    todo.isCompleted = !todo.isCompleted

    const { _id, ...rest } = todo; // Removing _id to avoid mutating in DB
    const updatedTodo = { ...rest };

    try {
      if (!todo) return;
      const data: Todo = await patchHttp<Todo>('todo', _id, updatedTodo)

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
      const data = await deleteHttp<{message: string}>('todo', id)

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
      { congrats
        && 
        <Confetti 
          recycle={false} 
          numberOfPieces={400} 
          gravity={0.170}
          initialVelocityY={4.5}
        /> 
      }
      <h1 data-testid="title" className="text-2xl font-bold mb-4 text-center">TODO List</h1>
      <div className="flex flex-col sm:flex-row w-full justify-evenly mb-4">
        <input 
          type="text" 
          data-testid="input-add" 
          value={inputValue} 
          onChange={onInputChange} 
          className="mx-1 py-2 px-4 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0"
          placeholder="Add a new todo"
        />
        <button 
          data-testid="button-add" 
          onClick={addTodo} 
          className="md:ml-2 mx-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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