import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { SearchField } from "./components/SearchField/SearchField";
import { TasksWrapper } from "./components/TasksWrapper/TasksWrapper";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { FilterTags } from "./components/FilterTags/FilterTags";
import { useEffect, useRef } from "react";
import { setValue, selectSearch } from "./features/search/searchSlice";
import { useLocation } from "react-router-dom";
import { setTodo } from "./features/todo/todoSlice";
import { TaskInterface } from "./components/Task/TaskInterface";
import { getItemsFromDatabase } from "./api/tasks";
import "./App.css";

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const location = useLocation();
  const searchValue = useAppSelector(selectSearch);
  const currentSearchValue = location.search.slice(3);
  const currentSearchValueDecoded = decodeURIComponent(currentSearchValue);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      const response = await getItemsFromDatabase();
      const data = await response.json();
      if (searchValue === "") {
        dispatch(setValue(currentSearchValueDecoded));
        const foundTodos = data.filter((item: TaskInterface) =>
          item.title.toLowerCase().includes(currentSearchValueDecoded)
        );
        dispatch(setTodo(foundTodos));
      }
    };
    init();
  }, [currentSearchValueDecoded, dispatch, searchValue]);

  return (
    <div className="App">
      <Header text="To Do List" />
      <SearchField />
      <FilterTags />
      <Routes>
        <Route path="/" element={<TasksWrapper modalRef={formRef} />} />
        <Route path="/tasks/" element={<TasksWrapper modalRef={formRef} />} />
        <Route
          path="/tasks/all"
          element={<TasksWrapper modalRef={formRef} />}
        />
        <Route
          path="/tasks/home"
          element={<TasksWrapper type="home" modalRef={formRef} />}
        />
        <Route
          path="/tasks/health"
          element={<TasksWrapper type="health" modalRef={formRef} />}
        />
        <Route
          path="/tasks/work"
          element={<TasksWrapper type="work" modalRef={formRef} />}
        />
        <Route
          path="/tasks/other"
          element={<TasksWrapper type="other" modalRef={formRef} />}
        />
      </Routes>

      <Modal modalRef={formRef} />
    </div>
  );
}

export default App;
