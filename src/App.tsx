import "./App.css";
import { useState, useEffect } from "react";
import TodoItem from "./components/todoItem";

type todoTask = {
  id: number;
  task: string;
  complete: boolean;
};

function App() {
  const [todo, setTodo] = useState<todoTask[]>(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");

  function handleDelete(id: number) {
    setTodo(todo.filter((item) => item.id !== id));
  }

  function handleToggle(id: number) {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item,
      ),
    );
  }


  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="app">
      <h1 className="title">ToDo App</h1>

      <div className="input-wrapper">
        <input
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
          type="text"
          placeholder="What needs to be done?"
        />
        <button
          onClick={() => {
            if (newTask) {
              const newId = todo.length + 1;
              setTodo([...todo, { id: newId, task: newTask, complete: false }]);
              setNewTask("");
            }
          }}
          className="add-button"
        >
          Add
        </button>
      </div>

      <div className="todo-list">
        {todo.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            task={item.task}
            complete={item.complete}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
