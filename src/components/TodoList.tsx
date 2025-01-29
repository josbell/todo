import React, { useState, useEffect } from "react";

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
    <li 
      key={`li-${todo._id}`} 
      data-testid={`li-${todo.title}`}
      className="bg-gray-100 p-4 rounded m-2"
    >
      {todo.title}
    </li>
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
        console.log("response: ", response)
        return response.json()
      })
      .then((data: Todo) => {
        console.log("data: ", data)
        setTodoList([...todoList, data])
        setInputValue('');
      })
      .catch( error => {
        alert('Failed to create todo. Sorry bro. We kinda winging it out here')
        console.error(error)
      })
    }
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
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