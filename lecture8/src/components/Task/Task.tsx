import { useRef } from "react";
import { Tag } from "../Tag/Tag";
import { displayDate } from "./displayDate";
import { TaskInterface } from "./TaskInterface";
import { deleteItemFromDatabase, finishItemInDatabase } from "../../api/tasks";
import "./task.css";

export function Task({
  allTodos,
  setTodos,
  todo,
}: {
  todo: TaskInterface;
  allTodos: TaskInterface[];
  setTodos: React.Dispatch<TaskInterface[]>;
}) {
  const { title, tagtype, time, isActive, id } = todo;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const taskClassNames = isActive ? "task" : "task task__disabled";

  function finishTodo(event: React.MouseEvent<HTMLInputElement>) {
    const task = (event.target as HTMLInputElement).parentNode;
    let taskId: number;
    if (!(task instanceof HTMLElement)) return;
    taskId = +task.id;

    const [todo]: TaskInterface[] = allTodos.filter(
      (item: TaskInterface) => item.id === taskId
    );
    const restTodos: TaskInterface[] = allTodos.filter(
      (item: TaskInterface) => item.id !== taskId
    );
    todo.isActive = !todo.isActive;
    if (checkboxRef.current === null) return;
    checkboxRef.current.checked = true;
    finishItemInDatabase(todo, taskId);
    setTodos([...restTodos, todo]);
  }

  function deleteItem(event: React.MouseEvent<HTMLButtonElement>) {
    const eventTarget = event.target;
    if (!(eventTarget instanceof Element)) return;
    const eventTargetParent = eventTarget.parentNode;
    if (!(eventTargetParent instanceof HTMLElement)) {
      throw new TypeError("eventTargetParent must be instance of HTMLElement");
    }
    const id: number = parseInt(eventTargetParent.id);
    const restTodos: TaskInterface[] = allTodos.filter(
      (item: TaskInterface) => item.id !== id
    );
    deleteItemFromDatabase(id);
    setTodos(restTodos);
  }

  return (
    <li className={taskClassNames} id={id?.toString()}>
      <input
        type="checkbox"
        className="checkbox"
        onClick={finishTodo}
        defaultChecked={!isActive}
        ref={checkboxRef}
      />
      <div className="task__info">
        <h3>{title}</h3>
        <div className="task__details">
          <Tag type={tagtype} />
          <div className="task__date">{displayDate(time)}</div>
        </div>
      </div>
      <button className="task__bin" onClick={deleteItem}></button>
    </li>
  );
}
