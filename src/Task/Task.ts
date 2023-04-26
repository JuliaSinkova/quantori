import { displayDate } from "../functions";
import { Tag } from "../Tag/Tag";
import { TaskInterface } from "./TaskInterface";
import "./task.css";

//@ts-ignore
function importAll(r) {
  return r.keys().map(r);
}

//@ts-ignore
const images = importAll(
  //@ts-ignore
  require.context("../assets", false, /\.(svg)$/)
);

export function Task(
  { title, tagtype, time, isActive, id }: TaskInterface,
  deleteItem: (e: Event) => Promise<void>,
  finishItem: (e: Event) => Promise<void>
) {
  const task = document.createElement("li");
  task.classList.add("task");
  task.id = id.toString();

  const info = document.createElement("div");
  info.classList.add("task__info");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.onclick = finishItem;

  const h3 = document.createElement("h3");
  h3.innerHTML = title;

  const taskTag = Tag(tagtype);
  taskTag.style.cursor = "default";
  const bin = document.createElement("button");
  bin.classList.add("task__bin");
  bin.onclick = deleteItem;
  bin.style.background = `url(../assets/bin.svg)`;
  bin.onmouseover = () => {
    bin.style.background = `url(../assets/bin_hover.svg)`;
  };
  bin.onmouseout = () => {
    bin.style.background = `url(../assets/bin.svg)`;
  };

  const date = document.createElement("div");
  date.innerHTML = displayDate(time);
  date.classList.add("task__date");

  const details = document.createElement("div");
  details.classList.add("task__details");

  // Changes for completed tasks:
  if (!isActive) {
    taskTag.classList.add("tag--disabled");
    h3.classList.add("text--disabled");
    checkbox.checked = true;
    info.classList.add("task__info--disabled");
  }

  details.append(taskTag, date);
  info.append(h3, details);
  task.append(checkbox, info);
  task.append(bin);
  return task;
}
