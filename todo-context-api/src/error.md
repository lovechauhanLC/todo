<!-- App -->

import { useEffect, useState } from "react";;
import { TodoProvider } from "./context/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{id:Date.now(), ...todo}, ...prev])
  }
  const updateTodo = (id,todo) => {
    setTodos((prev) => prev.map((prevTodo)=> prevTodo.id === id ? todo : prevTodo ))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => (prev.filter((todo) => todo.id !== id)))
  }
const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo,completed: !prevTodo.completed} : prevTodo))
}

useEffect(()=>{
  const todos = JSON.parse(localStorage.getItem("todos"))

  if(todos && todos.length>0)
    setTodos(todos)
},[])

useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
},[todos])

  return (
    <TodoProvider value={{addTodo, updateTodo, deleteTodo, toggleComplete, todos}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

<!-- Todo Form -->

import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {

    const [todo,setTodo] = useState("");

    const {addTodo} = useTodo()

    const add = (e) => {
        e.prevenDefault()

        if(!todo) return

        addTodo({todo,completed:false})
        setTodo("")
    }

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

<!-- TodoContext -->

import {createContext, useContext} from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider
