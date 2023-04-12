(function () {
  let state = {
    searchValue: "",
    itemsRender: [
      {
        title: "My first task",
        tagtype: "other",
        time: "2023-03-15",
        isActive: true,
        taskid: 1,
      },
      {
        title: "My second task",
        tagtype: "home",
        time: "2023-04-12",
        isActive: true,
        taskid: 2,
      },
      {
        title: "My completed task",
        tagtype: "other",
        time: "2023-04-13",
        isActive: false,
        taskid: 3,
      },
    ],
    itemsAll: [
      {
        title: "My first task",
        tagtype: "other",
        time: "2023-03-12",
        isActive: true,
        taskid: 1,
      },
      {
        title: "My second task",
        tagtype: "home",
        time: "2023-04-10",
        isActive: true,
        taskid: 2,
      },
      {
        title: "My completed task",
        tagtype: "health",
        time: "2023-04-11",
        isActive: false,
        taskid: 3,
      },
    ],
  };

  let timeout = null;

  function useState() {
    state = JSON.parse(localStorage.getItem("state")) || state;

    function setValue(newValue) {
      state = newValue;
      localStorage.setItem("state", JSON.stringify(newValue));
      renderApp();
    }

    return [state, setValue];
  }

  function displayDate(date) {
    if (typeof date !== "string") {
      throw new TypeError("Display date argument must be string type");
    }

    const fullDate = new Date(date);
    const shortDateString = fullDate.toDateString();
    const fullDateStringWithYear = fullDate.toLocaleDateString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const fullDateString = fullDate.toLocaleDateString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    const nowFullDate = new Date();
    const nowShortDateString = nowFullDate.toDateString();

    const tommorowFullDate = new Date();
    tommorowFullDate.setDate(tommorowFullDate.getDate() + 1);
    const tommorowShortDateString = tommorowFullDate.toDateString();

    const isToday = shortDateString === nowShortDateString;
    const isTommorow = shortDateString === tommorowShortDateString;
    const isCurrentYear = fullDate.getYear() === nowFullDate.getYear();

    if (isToday) {
      return "Today";
    }

    if (isTommorow) {
      return "Tommorow";
    }

    if (isCurrentYear) {
      return fullDateString;
    }

    return fullDateStringWithYear;
  }

  function deleteItem(e) {
    const [state, setItems] = useState();
    const { itemsAll } = state;
    const id = parseInt(e.target.parentNode.id);
    const newItems = itemsAll.filter((item) =>
      item.taskid !== id ? true : false
    );

    setItems({ itemsAll: newItems, itemsRender: newItems, searchValue: "" });
  }

  function addItem() {
    const [state, setItems] = useState();
    const { itemsRender, itemsAll } = state;
    const form = document.querySelector(".modal");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      data.isActive = true;
      data.taskid = Date.now();
      setItems({
        itemsRender: [...itemsRender, data],
        itemsAll: [...itemsAll, data],
        searchValue: "",
      });
    });
  }

  function finishItem(e) {
    const [state, setItems] = useState();
    const { itemsAll } = state;
    const id = parseInt(e.target.parentNode.id);
    const newItems = itemsAll.map((item) => {
      if (item.taskid === id) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setItems({ itemsAll: newItems, itemsRender: newItems, searchValue: "" });
  }

  function searchItems(e) {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      value = e.target.value?.toLowerCase();
      const [state, setItems] = useState();
      const { itemsAll } = state;
      let foundItems = itemsAll.filter((item) =>
        item.title.toLowerCase().includes(value)
      );
      console.log(itemsAll);
      setItems({
        searchValue: value,
        itemsRender: foundItems,
        itemsAll: itemsAll,
      });
    }, 1500);
  }

  function formValidation(e) {
    const value = e.target.value;
    const btn = document.querySelector("#btn_add");
    if (value.trim() !== "") {
      btn.classList.remove("btn--modal-disabled");
      btn.classList.add("btn--modal-add");
      btn.disabled = false;
    } else {
      btn.classList.add("btn--modal-disabled");
      btn.disabled = true;
    }
  }

  function openModal() {
    const modal = document.querySelector(".modal");
    const modal_overlay = document.querySelector(".modal-overlay");
    modal.style.display = "flex";
    modal_overlay.style.display = "block";
  }

  function modalCancel() {
    const modal = document.querySelector(".modal");
    const modal_overlay = document.querySelector(".modal-overlay");
    modal.style.display = "none";
    modal_overlay.style.display = "none";
  }

  // App Components:
  function Header(text) {
    const header = document.createElement("h1");
    header.innerHTML = text;
    return header;
  }

  function SearchField(func, inputValue) {
    const div = document.createElement("div");
    div.classList.add("searchfield");
    const input = Input("Search text");
    input.onkeyup = func;
    input.id = "search";
    input.value = inputValue;

    const button = Button({ text: "+ New Task", onClick: openModal });
    button.classList.add("btn--new");
    div.append(input, button);
    return div;
  }

  function Input(placeholder) {
    const input = document.createElement("input");
    input.placeholder = placeholder;
    input.classList.add("input");
    return input;
  }

  function Task({ title, tagtype, time, isActive, taskid }) {
    const task = document.createElement("li");
    const info = document.createElement("div");
    const checkbox = document.createElement("input");
    const h3 = document.createElement("h3");
    const taskTag = Tag(tagtype);
    const bin = document.createElement("button");
    const date = document.createElement("div");
    const details = document.createElement("div");

    date.innerHTML = displayDate(time);
    task.classList.add("task");
    task.id = taskid;
    h3.innerHTML = title;
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.onclick = finishItem;
    bin.classList.add("task__bin");
    bin.onclick = deleteItem;
    info.classList.add("task__info");
    date.classList.add("task__date");
    details.classList.add("task__details");
    taskTag.style.cursor = "default";

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

  function TasksSection({ title, items, type }) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const ul = document.createElement("ul");
    if (type == "active") {
      items.forEach(({ title, tagtype, time, isActive, taskid }) => {
        if (isActive) {
          ul.append(Task({ title, tagtype, time, isActive, taskid }));
        }
      });
    } else {
      items.forEach(({ title, tagtype, time, isActive, taskid }) => {
        if (!isActive) {
          ul.append(Task({ title, tagtype, time, isActive, taskid }));
        }
      });
    }
    div.classList.add("task-section");
    h2.innerHTML = title;
    div.append(h2, ul);
    return div;
  }

  function Tasks(items) {
    const div = document.createElement("div");
    div.classList.add("tasks");
    const active = TasksSection({
      title: "All Tasks",
      items,
      type: "active",
    });
    const finished = TasksSection({
      title: "Completed Tasks",
      items,
      type: "finished",
    });
    div.append(active, finished);
    return div;
  }

  function Button({ text, onClick }) {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add("btn");
    button.onclick = onClick;
    return button;
  }

  function Tag(type) {
    const tag = document.createElement("label");
    tag.setAttribute("for", type);
    tag.innerHTML = type;
    tag.classList.add("tag", `tag--${type}`);

    return tag;
  }

  function DatePicker() {
    const input = document.createElement("input");
    input.type = "date";
    input.name = "time";
    input.valueAsDate = new Date();
    input.classList.add("date-picker");
    return input;
  }

  function Tags() {
    const fieldset = document.createElement("fieldset");
    const tag_home = Tag("home");
    const home = document.createElement("input");
    fieldset.name = "tagtype";
    home.type = "radio";
    home.id = "home";
    home.name = "tagtype";
    home.value = "home";
    const tag_health = Tag("health");
    const health = document.createElement("input");
    health.type = "radio";
    health.id = "health";
    health.name = "tagtype";
    health.value = "health";
    const tag_work = Tag("work");
    const work = document.createElement("input");
    work.type = "radio";
    work.id = "work";
    work.name = "tagtype";
    work.value = "work";
    const tag_other = Tag("other");
    const other = document.createElement("input");
    other.type = "radio";
    other.id = "other";
    other.name = "tagtype";
    other.checked = true;
    other.value = "other";

    fieldset.append(
      home,
      tag_home,
      work,
      tag_work,
      health,
      tag_health,
      other,
      tag_other
    );
    return fieldset;
  }

  function Modal() {
    const overlay = document.createElement("div");
    const modal = document.createElement("form");
    const main = document.createElement("div");
    const title = document.createElement("h2");
    const input = Input("Task Title");
    const buttons = document.createElement("div");
    const btn_cancel = Button({ text: "Cancel", onClick: modalCancel });
    const btn_add = Button({ text: "Add Task", onClick: addItem });
    const details = document.createElement("div");
    const tags = Tags();
    const datePicker = DatePicker();

    input.name = "title";
    input.required = "true";
    input.oninput = formValidation;
    overlay.classList.add("modal-overlay");
    modal.classList.add("modal");
    title.innerHTML = "Add New Task";
    input.classList.add("input--modal");
    btn_cancel.classList.add("btn--modal-cancel");
    btn_add.classList.add("btn--modal-disabled");
    btn_add.id = "btn_add";
    btn_add.type = "submit";

    buttons.classList.add("modal__buttons");
    details.classList.add("modal__details");
    tags.classList.add("tags");
    details.append(tags, datePicker);
    main.append(title, input, details);
    buttons.append(btn_cancel, btn_add);
    modal.append(main, buttons);
    overlay.append(modal);
    return overlay;
  }

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */
  function App() {
    const [state] = useState();
    const { itemsRender, searchValue } = state;
    console.log(itemsRender);
    const div = document.createElement("div");
    div.classList.add("wrapper");
    const header = Header("To Do List");
    const searchfield = SearchField(searchItems, searchValue);
    const modal = Modal();
    const tasks = Tasks(itemsRender);
    div.append(header, searchfield, modal, tasks);
    return div;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  function renderApp() {
    const appContainer = document.getElementById("functional-example");
    appContainer.innerHTML = "";
    appContainer.append(App());
  }

  // initial render
  renderApp();
})();
