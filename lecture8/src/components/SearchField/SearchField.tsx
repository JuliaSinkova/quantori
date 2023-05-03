import "./searchfield.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { TaskInterface } from "../Task/TaskInterface";
import { getItemsFromDatabase} from "../../api/tasks";

export function SearchField({
  setModalState,
  setTodos,
}: {
  setModalState: React.Dispatch<string>;
  setTodos: React.Dispatch<TaskInterface[]>;
}) {
  async function searchItems(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    const response = await getItemsFromDatabase();
    const data = await response.json();
    const foundTodos = data.filter((item: TaskInterface) =>
      item.title.toLowerCase().includes(value)
    );
    setTodos(foundTodos);
  }

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setModalState("open");
  };
  return (
    <div className="searchfield">
      <Input placeholder="Search text" id="search" onKeyUp={searchItems} />
      <Button text="+ New Task" className="btn--new" onClick={openModal} />
    </div>
  );
}
