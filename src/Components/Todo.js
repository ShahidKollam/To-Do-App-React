import React, { useEffect, useState, useRef } from "react";
import "./Todo.css";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (!todo.trim()) {
      setError("Please enter a todo item");
      return;
    }

    const isDuplicate = todos.some((item) => item.list === todo);
    if (isDuplicate) {
      setError("Todo item already exists");
      return;
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updatedTodos = todos.map((to) =>
        to.id === editTodo.id ? { ...to, list: todo } : to
      );
      setTodos(updatedTodos);
      setEditId(0);
    } else {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
    }
    setTodo("");
    setError("");
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP REACT</h2>

      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        />
        <button onClick={addTodo} className="btn btn-primary">
          {editId ? "EDIT" : "ADD"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="list">
        <ul>
          {todos.map((to) => (
            <li className="list-items">
              <div
                className="list-items-list"
                id={to.status ? "list-item" : ""}
              >
                {to.list}
              </div>
              <span>
                <IoCheckmarkDoneCircleOutline
                  onClick={() => onComplete(to.id)}
                  className="list-items-icons"
                  id="complete"
                  title="complete"
                />
                <CiEdit
                  onClick={() => onEdit(to.id)}
                  className="list-items-icons"
                  id="edit"
                  title="edit"
                />
                <MdDeleteForever
                  onClick={() => onDelete(to.id)}
                  className="list-items-icons"
                  id="delete"
                  title="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
