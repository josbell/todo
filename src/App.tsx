import React from "react";
import TodoList from './components/TodoList'

interface AppTodos {
  todos?: string[]
}


function App({ todos }: AppTodos) {

  return (
    <main className="flex flex-col w-1/2 py-5 px-10">
      <TodoList todos={todos || ['todo1', 'todo2', 'todo3']} />
    </main>
  )
}

export default App;