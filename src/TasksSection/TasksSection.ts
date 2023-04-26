import { TaskInterface } from "../Task/TaskInterface";
import { Task } from "../Task/Task";
import { TasksSectionInterface } from "./TasksSectionInterface";
import './tasksSection.css'
export function TasksSection(
  { title, items, sectionType }: TasksSectionInterface,
  deleteItem: (e: Event) => Promise<void>,
  finishItem: (e: Event) => Promise<void>
) {
  const tasksSection = document.createElement("div");
  tasksSection.classList.add("task-section");

  const tasksTitle = document.createElement("h2");
  tasksTitle.innerHTML = title;

  const tasksList = document.createElement("ul");
  const arr = items || [];
  // to create active tasks section
  if (sectionType === "active") {
    arr.forEach(({ title, tagtype, time, isActive, id }: TaskInterface) => {
      if (isActive) {
        tasksList.append(
          Task({ title, tagtype, time, isActive, id }, deleteItem, finishItem)
        );
      }
    });
  }
  // to create Completed tasks section
  else {
    arr.forEach(({ title, tagtype, time, isActive, id }: TaskInterface) => {
      if (!isActive) {
        tasksList.append(
          Task({ title, tagtype, time, isActive, id }, deleteItem, finishItem)
        );
      }
    });
  }

  tasksSection.append(tasksTitle, tasksList);

  return tasksSection;
}
