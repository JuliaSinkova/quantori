import { Task } from "../Task/Task";
import { TaskInterface } from "../Task/TaskInterface";
import "./tasksSection.css";

export function TaskSection(props: {
  title: string;
  todos: TaskInterface[];
  sectionType: string;
  setTodos: React.Dispatch<TaskInterface[]>;
}) {
  const { title, todos, sectionType, setTodos } = props;
  const filteredItems =
    sectionType === "active"
      ? todos.filter((item) => !!item.isActive)
      : todos.filter((item) => !item.isActive);

  const listItems = filteredItems.map((item) => (
    <Task key={item.id} setTodos={setTodos} allTodos={todos} todo={item}></Task>
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
