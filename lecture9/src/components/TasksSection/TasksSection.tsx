import { useAppSelector } from "../../app/hooks";
import { selectTodos } from "../../features/todo/todoSlice";
import { Task } from "../Task/Task";
import "./tasksSection.css";

export function TaskSection(props: {
  title: string;
  sectionType: string;
  type?: string;
  modalRef: React.RefObject<HTMLFormElement>;
}) {
  const { title, sectionType, type, modalRef } = props;

  const todos = useAppSelector(selectTodos);
  const filteredByTag = type
    ? todos.filter((todo) => todo.tagtype === type)
    : todos;
  const filteredItems =
    sectionType === "active"
      ? filteredByTag.filter((item) => !!item.isActive)
      : filteredByTag.filter((item) => !item.isActive);

  const listItems = filteredItems.map((item) => (
    <Task key={item.id} todo={item} modalRef={modalRef}></Task>
  ));
  if (listItems.length === 0 && sectionType === "active")
    return (
      <div className="task-section">
        <h2>{title}</h2>
        <div className="task-section__placeholder">
          <h1>🤔</h1>
          <h4>There are no tasks here</h4>
          <div>Maybe it's time to add a couple?</div>
        </div>
      </div>
    );
  if (listItems.length === 0 && sectionType === "finished")
    return (
      <div className="task-section">
        <h2>{title}</h2>
        <div className="task-section__placeholder">
          <h1>😔</h1>
          <h4>There are no completed tasks</h4>
          <div>
            Check the tasks after you have completed them <br /> and they will
            be displayed here
          </div>
        </div>
      </div>
    );

  return (
    <div className="task-section">
      <h2>{title}</h2>
      <ul>{listItems}</ul>
    </div>
  );
}
