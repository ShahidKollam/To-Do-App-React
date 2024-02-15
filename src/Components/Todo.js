import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
 
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      console.log(todos);
      setTodo("");
    } 
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
    }
  };

  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
  });

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
