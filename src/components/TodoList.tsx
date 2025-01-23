import React, { useState } from "react";


function TodoList({todos} : { todos?: string[]}) {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState<string[]>(todos || []);
  
  const todoListHTML = todoList?.map( todo => (
    <li 
      key={`li-${todo}`} 
      data-testid={`li-${todo}`}
      className="bg-gray-100 p-4 rounded m-2"
    >
      {todo}
    </li>
  ))

  function addTodo() {
    if (inputValue) {
      setTodoList([...todoList, inputValue]);
      setInputValue('');
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