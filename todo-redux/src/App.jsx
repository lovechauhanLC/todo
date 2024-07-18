import { useState } from 'react'
import './App.css'
import AddTodos from './components/AddTodos'
import Todos from './components/Todos'

function App() {


  return (
    <div>
      <h1>Todo - Redux</h1>
      <AddTodos/>
      <Todos/>
      </div>
  )
}

export default App
