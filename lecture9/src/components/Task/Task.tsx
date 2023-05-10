import { useRef } from "react";
import { Tag } from "../Tag/Tag";
import { displayDate } from "./displayDate";
import { TaskInterface } from "./TaskInterface";
import { deleteItemFromDatabase, finishItemInDatabase } from "../../api/tasks";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectTodos,
  deleteTodo,
  finishTodo,
  setCurrentEditTask,
} from "../../features/todo/todoSlice";
import { showModal, setInputValid } from "../../features/modal/modalSlice";
import "./task.css";

export function Task({
  todo,
  modalRef,
}: {
  todo: TaskInterface;
  modalRef: React.RefObject<HTMLFormElement>;
}) {
  const dispatch = useAppDispatch();
  const { title, tagtype, time, isActive, id } = todo;
  const checkboxRef = useRef<HTMLInputElement>(null);
  const taskClassNames = isActive ? "task" : "task task__disabled";
  const todos = useAppSelector(selectTodos);

  function finishItem(event: React.MouseEvent<HTMLInputElement>) {
    const task = (event.target as HTMLInputElement).parentNode;
    let taskId: number;
    if (!(task instanceof HTMLElement)) return;
    taskId = +task.id;
    const newTodo = {
      title,
      tagtype,
      time,
      isActive: !isActive,
      id,
    };
    if (checkboxRef.current === null) return;
    checkboxRef.current.checked = true;
    dispatch(finishTodo(newTodo));
    finishItemInDatabase(newTodo, taskId);
  }

  function deleteItem(event: React.MouseEvent<HTMLButtonElement>) {
    const eventTarget = event.target;
    if (!(eventTarget instanceof Element)) return;
    const eventTargetParent = eventTarget.parentNode;
    if (!(eventTargetParent instanceof HTMLElement)) {
      throw new TypeError("eventTargetParent must be instance of HTMLElement");
    }
    const id: number = parseInt(eventTargetParent.id);
    dispatch(deleteTodo(id));
    deleteItemFromDatabase(id);
  }

  function editTask(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch(setInputValid(true));
    const taskId = (
      (event.target as HTMLButtonElement).parentNode as HTMLUListElement
    ).id;
    const [task] = todos.filter((todo) => todo.id === parseInt(taskId));
    const input = (modalRef.current as HTMLFormElement)
      .children[1] as HTMLInputElement;
    const datePicker = (
      (modalRef.current as HTMLFormElement).children[2] as HTMLDivElement
    ).children[1] as HTMLInputElement;
    input.value = task.title;
    datePicker.value = task.time;
    console.log(
      (
        ((modalRef.current as HTMLFormElement).children[2] as HTMLDivElement)
          .children[0] as HTMLFieldSetElement
      ).children
    );
    dispatch(showModal());
    dispatch(setCurrentEditTask(task));
  }

  return (
    <li className={taskClassNames} id={id?.toString()}>
      <input
        type="checkbox"
        className="checkbox"
        onClick={finishItem}
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
      <button className="task__edit" onClick={editTask}></button>
      <button className="task__bin" onClick={deleteItem}></button>
    </li>
  );
}
