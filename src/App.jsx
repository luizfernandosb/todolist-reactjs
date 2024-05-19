import "./App.css";
import { FaCheck, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useState, useRef } from "react";
import "./index.css";

function App() {
  const [listTodo, setListTodo] = useState([]);
  const todoRef = useRef("");

  const gerarIdRandomico = () => {
    const caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let idRandomico = "";
    for (let i = 0; i < 4; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      idRandomico += caracteres.charAt(indiceAleatorio);
    }
    return idRandomico;
  };

  const handleTodo = () => {
    if (todoRef.current.value.trim() === "") return;
    const newTodo = {
      todo: todoRef.current.value,
      id: gerarIdRandomico(),
      completed: false,
    };
    setListTodo([...listTodo, newTodo]);

    toast("Tarefa adicionada com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    todoRef.current.value = "";
    todoRef.current.focus();
  };

  const handleDelete = (id) => {
    const newTodos = [...listTodo];
    const filteredTodos = newTodos.filter((todo) =>
      todo.id !== id ? todo : null
    );
    setListTodo(filteredTodos);

    toast.error("Tarefa deletada com sucesso.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleComplete = (id) => {
    const newTodos = [...listTodo];
    newTodos.map((todo) =>
      todo.id === id ? (todo.completed = !todo.completed) : todo
    );
    setListTodo(newTodos);
    toast.success("Tarefa concluída com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const pendingTodos = [...listTodo].filter((todo) => !todo.completed);

  const completedTodos = [...listTodo].filter((todo) => todo.completed);

  return (
    <div id="container">
      <h1>Lista de tarefas</h1>
      {/* status das tarefas */}
      <div id="status">
        <p>
          Tarefas concluídas: <span id="check">{completedTodos.length}</span>
        </p>
        <p>
          Tarefas pendentens: <span id="pending">{pendingTodos.length}</span>
        </p>
      </div>
      {/* lista de tarefas */}
      <div id="list">
        {/* card da tarefa */}

        {listTodo.length === 0 ? (
          <p id="empety">Você não tem nenhuma tarefa.</p>
        ) : (
          <>
            {listTodo.map((todo, id) => (
              <div
                id="todo"
                key={id}
                style={{
                  backgroundColor: todo.completed
                    ? "rgba(21, 88, 0, 0.534)"
                    : "",
                }}
              >
                <p>{todo.todo}</p>
                <span id="icons">
                  <FaTrash id="delete" onClick={() => handleDelete(todo.id)} />{" "}
                  <FaCheck
                    id="complete"
                    onClick={() => handleComplete(todo.id)}
                  />
                </span>
              </div>
            ))}
          </>
        )}
      </div>
      {/* adicionar nova tarefa */}
      <form action="#" id="form" className="form__group field">
        <div className="form__group field">
          <input
            type="text"
            ref={todoRef}
            className="form__field"
            placeholder="Name"
            required=""
          />
          <label className="form__label">Tarefa</label>
          <button onClick={handleTodo} type="submit" className="btn">
            Adicionar
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default App;
