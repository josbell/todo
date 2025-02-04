import React from "react";
import TodoList from './components/TodoList'


function App() {

  return (
    <main className="flex flex-col w-full md:w-2/3 lg:w-1/2 py-5 px-4 sm:px-10 mx-auto">
      <TodoList />
    </main>
  )
}

export default App;