import "./searchfield.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { TaskInterface } from "../Task/TaskInterface";
import { getItemsFromDatabase } from "../../api/tasks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { showModal } from "../../features/modal/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setTodo } from "../../features/todo/todoSlice";
import { setValue, selectSearch } from "../../features/search/searchSlice";

export function SearchField() {
  let searchValue = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const location = useLocation();

  async function searchItems(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    dispatch(setValue(value));
    const enc = encodeURIComponent(value);
    console.log(location);
    const uri = location.pathname + "?q=" + enc;
    navigate(uri);
    const response = await getItemsFromDatabase();
    const data = await response.json();
    const foundTodos = data.filter((item: TaskInterface) =>
      item.title.toLowerCase().includes(value)
    );
    dispatch(setTodo(foundTodos));
  }

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(showModal());
  };

  return (
    <div className="searchfield">
      <Input
        placeholder="Search text"
        id="search"
        onKeyUp={searchItems}
        defaultValue={searchValue}
      />
      <Button text="+ New Task" className="btn--new" onClick={openModal} />
    </div>
  );
}
