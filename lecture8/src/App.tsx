import "./App.css";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { SearchField } from "./components/SearchField/SearchField";
import { TasksWrapper } from "./components/TasksWrapper/TasksWrapper";
import { TaskInterface } from "./components/Task/TaskInterface";
import { useState } from "react";

function App() {
  const [modalState, setModalState] = useState("closed");
  const [todos, setTodos] = useState<TaskInterface[]>([]);

  return (
    <div className="App">
      <Header text="To Do List" />
      <SearchField setModalState={setModalState} setTodos={setTodos} />
      <TasksWrapper todos={todos} setTodos={setTodos} />
      <Modal
        modalState={modalState}
        setModalState={setModalState}
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
}

export default App;
