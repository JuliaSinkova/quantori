import { Modal } from "./Modal/Modal";
import { Header } from "./Header/Header";
import { SearchField } from "./SearchField/SearchField";
import { TasksWrapper } from "./TasksWrapper/TasksWrapper";
import { TaskInterface } from "./Task/TaskInterface";
import "./main.css";

let state: TaskInterface[];
let searchValue = "";
const baseUrl = "http://localhost:3004";

async function getTasks(): Promise<TaskInterface[]> {
  let response = await fetch(`${baseUrl}/tasks`);

  return response.json();
}
async function addTask(data: TaskInterface) {
  return fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
async function finishTask(task: TaskInterface, id: number) {
  const { title, tagtype, time, isActive } = task;
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      tagtype: tagtype,
      time: time,
      isActive: !isActive,
    }),
  });
}
async function deleteTask(id: number) {
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
}

let timeout: number | null = null;

async function useState(): Promise<
  [TaskInterface[], (newValue?: TaskInterface[]) => Promise<void>]
> {
  let tasks = await getTasks();
  state = state || tasks;

  async function setValue(newValue?: TaskInterface[]): Promise<void> {
    let tasks = await getTasks();
    state = newValue || tasks;
    await renderApp();
  }
  return [state, setValue];
}
/**
 * App container
 * @returns {HTMLDivElement} - The app container
 */
async function App(): Promise<HTMLDivElement> {
  const [state, setItems] = await useState();

  async function deleteItem(event: Event): Promise<void> {
    const eventTarget = event.target;

    if (!(eventTarget instanceof Element)) {
      throw new TypeError("event.target must be instance of Element");
    }

    const eventTargetParent = eventTarget.parentNode;
    if (!(eventTargetParent instanceof HTMLElement)) {
      throw new TypeError("eventTargetParent must be instance of HTMLElement");
    }

    const id: number = parseInt(eventTargetParent.id);
    await deleteTask(id);
    setItems();
  }

  async function addItem(event: Event): Promise<void> {
    interface RequestData {
      title: string;
      tagtype: string;
      date: string;
    }
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<
      [RequestData, FormDataEntryValue]
    >;
    const data = Object.fromEntries(formData);
    console.log(data);
    data.isActive = true;
    await addTask(data);
    setItems();
  }

  async function finishItem(event: Event): Promise<void> {
    const eventTarget = event.target;

    if (!(eventTarget instanceof Element)) {
      throw new TypeError("event.target must be instance of Element");
    }

    const eventTargetParent = eventTarget.parentNode;
    if (!(eventTargetParent instanceof HTMLElement)) {
      throw new TypeError("eventTargetParent must be instance of HTMLElement");
    }

    const id: number = parseInt(eventTargetParent.id);
    const [task]: TaskInterface[] = state.filter(
      (item: TaskInterface) => item.id === id
    );
    await finishTask(task, id);
    setItems();
  }

  async function searchItems(e: Event): Promise<void> {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(async function () {
      const items = await getTasks();
      let value = (e.target as HTMLInputElement).value?.toLowerCase();
      searchValue = value;
      let foundItems = items.filter((item: TaskInterface) =>
        item.title.toLowerCase().includes(value)
      );
      setItems(foundItems);
    }, 1500);
  }
  function modalCancel(): void {
    const modal: Element | null = document.querySelector(".modal");
    const modal_overlay: Element | null =
      document.querySelector(".modal-overlay");
    if (modal && modal_overlay) {
      (modal as HTMLElement).style.display = "none";
      (modal_overlay as HTMLElement).style.display = "none";
    }
    setItems();
  }

  const div = document.createElement("div");
  div.classList.add("wrapper");
  const header = await Header("To Do List");
  const searchfield = SearchField(searchItems, searchValue);
  const modal = Modal(addItem, modalCancel);
  const tasks = TasksWrapper(state, deleteItem, finishItem);

  div.append(header, searchfield, tasks, modal);
  return div;
}
async function renderApp() {
  const appContainer = document.getElementById("functional-example");
  appContainer.innerHTML = "";
  appContainer.append(await App());
  console.log("rendered");
  const result = await navigator.permissions.query({ name: "geolocation" });
  if (result.state === "denied") {
    localStorage.clear();
  }
}

// initial render
renderApp();
