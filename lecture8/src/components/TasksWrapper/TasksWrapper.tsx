import { TaskSection } from "../TasksSection/TasksSection";
import { TaskInterface } from "../Task/TaskInterface";
import { useEffect } from "react";
import { getItemsFromDatabase } from "../../api/tasks";
import "./tasksWrapper.css";

export function TasksWrapper({
  todos,
  setTodos,
}: {
  todos: TaskInterface[];
  setTodos: React.Dispatch<TaskInterface[]>;
}) {
  useEffect(() => {
    const init = async () => {
      const response = await getItemsFromDatabase();
      const data = await response.json();
      setTodos(data);
    };
    init();
  }, []);

  return (
    <div className="tasks">
      <TaskSection
        title="All Tasks"
        todos={todos}
        sectionType="active"
        setTodos={setTodos}
      />
      <TaskSection
        title="Completed Tasks"
        todos={todos}
        sectionType="finished"
        setTodos={setTodos}
      />
    </div>
  );
}
