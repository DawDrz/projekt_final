import { useEffect, useState } from "react";
import axios from "axios"
import styles from "./styles.module.css"


const Todo = () => {
    const [data, setData] = useState(
        ""
    )
    const [error, setError] = useState("")
const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const url = "http://localhost:8080/api/todo"
            const {data: res} = await axios.post(url, data)
            console.log(res.message)
            window.location = "/todo"
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    const returnToMain = () => {
        window.location = "/"
    }

const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }


  function handleEditInputChange(e) {
 
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }


  function handleUpdateTodo(id, updatedTodo) {

    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);

    setTodos(updatedItem);
  }


  function handleEditClick(todo) {

    setIsEditing(true);

    setCurrentTodo({ ...todo });
  }
  return (
    <div className="App">

      {isEditing ? (

        <form onSubmit={handleEditFormSubmit}>

          <h2>Edytowane zadanie</h2>

          <label htmlFor="editTodo">Nowa nazwa: </label>

          <input
            name="editTodo"
            type="text"
            placeholder="Zaktualizowane zadanie"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />

          <button type="submit">Zapisz</button>

          <button onClick={() => setIsEditing(false)}>Wróć</button>
        </form>
      ) : (

        <form onSubmit={handleFormSubmit}>

          <h2>Lista zadań</h2>

          <label htmlFor="todo">Dodaj zadanie: </label>

          <input
            name="todo"
            type="text"
            placeholder="Nowe zadanie"
            value={todo}
            onChange={handleInputChange}
          />

          <button type="submit">Dodaj</button>
        </form>
      )}



      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}

            <button onClick={() => handleEditClick(todo)}>Edytuj</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <button onClick={returnToMain}>Powrót</button>
    </div>
  );
        }

export default Todo;