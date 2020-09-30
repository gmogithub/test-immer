import React from 'react';
import './App.css';
import { TodoList } from "./components/TodoList";
import { TodoListReducer } from "./components/TodoListReducer";

function App() {

  return (
    <div className="App">
      {/*<TodoList/>*/}
      <TodoListReducer/>
    </div>
  );
}

export default App;
