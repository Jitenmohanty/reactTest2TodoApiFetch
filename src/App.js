import React, { useState, useEffect } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newTodo, completed: false })
        }
      );
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ completed })
        }
      );
      if (response.ok) {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        console.error("Error updating todo:", response.status);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE"
        }
      );
      if (response.ok) {
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      } else {
        console.error("Error deleting todo:", response.status);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div style={{ margin: "16px" }}>
        <input
          style={{
            background: "lightgrey",

            borderRadius: "7px",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: "48px",
            padding: "0 30px",
            fontSize: "20px",
            color: "blue",
            resize: "none",
            margin: "5px"
          }}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          style={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            borderRadius: "7px",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: "48px",
            padding: "0 30px",
            fontSize: "20px",
            color: "blue",
            resize: "none"
          }}
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            style={{
              float: "left",
              width: "33.33%",
              listStyle: "none",
              display: "table",
              boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "#f1f1f1",
              // height: "33.33%",
              margin: "10px"
              // fontStyle: "normal"

              // float: "left",
              // width: "33.33%",
              // textAlign: "center",
              // fontSize: "25px",
              // cursor: "pointer",
              // color: "black"
            }}
            key={todo.id}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                fontFamily: "sans-serif",
                fontSize: "17px"
              }}
            >
              {todo.title}
            </span>
            <button
              style={{
                backgroundColor: "green",
                height: "30px",
                width: "150px",
                border: "2px solid grey",
                borderRadius: "5px",
                marginLeft: "20px",
                marginBottom: "7px",
                cursor: "pointer",
                fontSize: "16px",
                color: "yellow"
              }}
              onClick={() => updateTodo(todo.id, !todo.completed)}
            >
              {todo.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              style={{
                backgroundColor: "red",
                height: "30px",
                width: "80px",
                border: "2px solid grey",
                borderRadius: "5px",
                marginLeft: "20px",
                marginBottom: "7px",
                cursor: "pointer",
                fontSize: "16px",
                color: "yellow"
              }}
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
