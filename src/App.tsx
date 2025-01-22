import React from "react";

function App() {
  return (
    <main>
      <h1 data-testid="title" className="text-red">TODO List</h1>
      <input type="text" data-testid="input-add"></input>
      <button data-testid="button-add" className="border-red-500 py-2 px-4">Add Todo</button>
    </main>
  )
}

export default App;