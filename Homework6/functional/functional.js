(function () {
  let state;
  let searchValue = '';
  async function getTasks() {
    let response = fetch(`http://localhost:3004/tasks`);
    return (await response).json();
  }

  let timeout = null;

  async function useState() {
    let tasks = await getTasks();
    state = state || tasks;

    async function setValue(newValue) {
      state = newValue || tasks;
      await renderApp();
    }
    return [state, setValue];
  }

  function displayDate(date) {
    const fullDate = new Date(date);
    const shortDateString = fullDate.toDateString();
    const fullDateStringWithYear = fullDate.toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const fullDateString = fullDate.toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
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
      return 'Today';
    }

    if (isTommorow) {
      return 'Tomorrow';
    }

    if (isCurrentYear) {
      return fullDateString;
    }

    return fullDateStringWithYear;
  }

  function formValidation(e) {
    const value = e.target.value;
    const btn = document.querySelector('#btn_add');
    if (value.trim() !== '') {
      btn.classList.remove('btn--modal-disabled');
      btn.classList.add('btn--modal-add');
      btn.disabled = false;
    } else {
      btn.classList.add('btn--modal-disabled');
      btn.disabled = true;
    }
  }

  function openModal() {
    const modal = document.querySelector('.modal');
    const modal_overlay = document.querySelector('.modal-overlay');
    modal.style.display = 'flex';
    modal_overlay.style.display = 'block';
  }

  function modalCancel() {
    const modal = document.querySelector('.modal');
    const modal_overlay = document.querySelector('.modal-overlay');
    modal.style.display = 'none';
    modal_overlay.style.display = 'none';
  }

  function getPromiseLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function getLocation() {
    const TBILISI_LOCATION = {
      long: 44.783333,
      lat: 41.716667,
    };
    let result;
    try {
      const position = await getPromiseLocation();
      result = {
        long: position.coords.longitude,
        lat: position.coords.latitude,
      };
      localStorage.setItem('geo', JSON.stringify(result));
    } catch (error) {
      result = TBILISI_LOCATION;
    }
    return result;
  }
  function getWeather(coords) {
    const API_Key = '83e5e9c8d32f4ce984b134333231604';
    return fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${coords.lat},${coords.long}&aqi=no`
    );
  }

  // App Components:
  async function WeatherWidget() {
    const conditions = {
      Sunny__day: 'Sunny',
      Clear__night: 'Clear',
      Cloudy__day: 'Cloudy__day',
      Cloudy__night: 'Cloudy__night',
      'Partly cloudy__day': 'Partly_cloudy__day',
      'Partly cloudy__night': 'Partly_cloudy__night',
      Overcast__day: 'Overcast__day',
      Overcast__night: 'Overcast__night',
      Mist__day: 'Mist__day',
      Mist__night: 'Mist__night',
      'Patchy rain possible__day': 'Rain__day',
      'Patchy rain possible__night': 'Rain__night',
      'Patchy snow possible__day': 'Snow__day',
      'Patchy snow possible__night': 'Snow__night',
      'Patchy sleet possible__day': 'Sleet__day',
      'Patchy sleet possible__night': 'Sleet__night',
      'Patchy freezing drizzle possible__day': 'Drizzle__day',
      'Patchy freezing drizzle possible__night': 'Drizzle__night',
      'Thundery outbreaks possible__day': 'Thunder__day',
      'Thundery outbreaks possible__night': 'Thunder__night',
      'Blowing snow__day': 'Blowing_snow__day',
      'Blowing snow__night': 'Blowing_snow__night',
      Blizzard__day: 'Blowing_snow__day',
      Blizzard__night: 'Blowing_snow__night',
      Fog__day: 'Fog__day',
      Fog__night: 'Fog__night',
      'Freezing fog__day': 'Fog__day',
      'Freezing fog__night': 'Fog__night',
      'Patchy light drizzle__day': 'Drizzle__day',
      'Patchy light drizzle__night': 'Drizzle__night',
      'Light drizzle__day': 'Drizzle__day',
      'Light drizzle__night': 'Drizzle__night',
      'Freezing drizzle__day': 'Drizzle__day',
      'Freezing drizzle__night': 'Drizzle__night',
      'Heavy freezing drizzle__day': 'Drizzle__day',
      'Heavy freezing drizzle__night': 'Drizzle__night',
      'Patchy light rain__day': 'Rain__day',
      'Patchy light rain__night': 'Rain__day',
      'Light rain__night': 'Rain__day',
      'Light rain__night': 'Rain__night',
      'Moderate rain at times__day': 'Rain__day',
      'Moderate rain at times__night': 'Rain__night',
      'Moderate rain__day': 'Rain__day',
      'Moderate rain__night': 'Rain__night',
      'Heavy rain at times__day': 'Rain__day',
      'Heavy rain at times__night': 'Rain__night',
      'Heavy rain__day': 'Rain__day',
      'Heavy rain__night': 'Rain__night',
      'Light freezing rain__day': 'Rain__day',
      'Light freezing rain__night': 'Rain__night',
      'Moderate or heavy freezing rain__day': 'Rain__day',
      'Moderate or heavy freezing rain__night': 'Rain__night',
      'Light sleet__day': 'Sleet__day',
      'Light sleet__night': 'Sleet__night',
      'Moderate or heavy sleet__day': 'Sleet__day',
      'Moderate or heavy sleet__night': 'Sleet__night',
      'Patchy light snow__day': 'Snow__day',
      'Patchy light snow__night': 'Snow__night',
      'Light snow__day': 'Snow__day',
      'Light snow__night': 'Snow__night',
      'Patchy moderate snow__day': 'Snow__day',
      'Patchy moderate snow__night': 'Snow__night',
      'Moderate snow__day': 'Snow__day',
      'Moderate snow__night': 'Snow__night',
      'Patchy heavy snow__day': 'Snow__day',
      'Patchy heavy snow__night': 'Snow__night',
      'Heavy snow__day': 'Snow__day',
      'Heavy snow__night': 'Snow__night',
      'Ice pellets__day': 'Ice_pellets__day',
      'Ice pellets__night': 'Ice_pellets__night',
      'Light rain shower__day': 'Rain__day',
      'Light rain shower__night': 'Rain__night',
      'Moderate or heavy rain shower__day': 'Rain__day',
      'Moderate or heavy rain shower__night': 'Rain__night',
      'Torrential rain shower__day': 'Rain__day',
      'Torrential rain shower__night': 'Rain__night',
      'Light sleet showers__day': 'Sleet__day',
      'Light sleet showers__night': 'Sleet__night',
      'Moderate or heavy sleet showers__day': 'Sleet__day',
      'Moderate or heavy sleet showers__night': 'Sleet__night',
      'Light snow showers__day': 'Snow__day',
      'Light snow showers__night': 'Snow__night',
      'Moderate or heavy snow showers__day': 'Snow__dayt',
      'Moderate or heavy snow showers__night': 'Snow__night',
      'Light showers of ice pellets__day': 'Ice_pellets__day',
      'Light showers of ice pellets__night': 'Ice_pellets__night',
      'Moderate or heavy showers of ice pellets__day': 'Ice_pellets__day',
      'Moderate or heavy showers of ice pellets__night': 'Ice_pellets__night',
      'Patchy light rain with thunder__day': 'Rain_thunder__day',
      'Patchy light rain with thunder__night': 'Rain_thunder__night',
      'Moderate or heavy rain with thunder__day': 'Rain_thunder__day',
      'Moderate or heavy rain with thunder__night': 'Rain_thunder__night',
      'Patchy light snow with thunder__day': 'Snow_thunder__day',
      'Patchy light snow with thunder__night': 'Snow_thunder__night',
      'Moderate or heavy snow with thunder__day': 'Snow_thunder__day',
      'Moderate or heavy snow with thunder__night': 'Snow_thunder__night',
    };

    const div = document.createElement('div');
    const city = document.createElement('div');
    const icon = document.createElement('img');
    const temp = document.createElement('div');
    const tooltip = document.createElement('div');
    const coords =
      JSON.parse(localStorage.getItem('geo')) || (await getLocation());
    const weather = await (await getWeather(coords)).json();
    const text = weather.current.condition.text;
    const isDay = weather.current.is_day;
    const timeOfDay = !!isDay ? 'day' : 'night';
    const condition = `${text}__${timeOfDay}`;

    div.classList.add('weather');
    city.innerHTML = weather.location.name;
    tooltip.innerHTML = text;
    tooltip.classList.add('weather__tooltip');
    city.classList.add('weather__city');
    icon.src = `./assets/${conditions[condition]}.svg`;
    temp.innerHTML = `${weather.current.temp_c}º`;
    temp.classList.add('weather__temp');
    div.append(icon, tooltip, temp, city);
    return div;
  }

  async function Header(text) {
    const div = document.createElement('div');
    div.classList.add('header');
    const header = document.createElement('h1');
    const weather = await WeatherWidget();
    header.innerHTML = text;
    div.append(header, weather);
    return div;
  }

  function SearchField(func, inputValue) {
    const div = document.createElement('div');
    div.classList.add('searchfield');
    const input = Input('Search text');
    input.onkeyup = func;
    input.id = 'search';
    input.value = inputValue;

    const button = Button({ text: '+ New Task', onClick: openModal });
    button.classList.add('btn--new');
    div.append(input, button);
    return div;
  }

  function Input(placeholder) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.classList.add('input');
    return input;
  }

  function Task(
    { title, tagtype, time, isActive, id },
    deleteItem,
    finishItem
  ) {
    const task = document.createElement('li');
    task.classList.add('task');
    task.id = id;

    const info = document.createElement('div');
    info.classList.add('task__info');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.onclick = finishItem;

    const h3 = document.createElement('h3');
    h3.innerHTML = title;

    const taskTag = Tag(tagtype);
    taskTag.style.cursor = 'default';
    const bin = document.createElement('button');
    bin.classList.add('task__bin');
    bin.onclick = deleteItem;

    const date = document.createElement('div');
    date.innerHTML = displayDate(time);
    date.classList.add('task__date');

    const details = document.createElement('div');
    details.classList.add('task__details');

    // Changes for completed tasks:
    if (!isActive) {
      taskTag.classList.add('tag--disabled');
      h3.classList.add('text--disabled');
      checkbox.checked = true;
      info.classList.add('task__info--disabled');
    }

    details.append(taskTag, date);
    info.append(h3, details);
    task.append(checkbox, info);
    task.append(bin);
    return task;
  }

  function TasksSection({ title, items, sectionType }, deleteItem, finishItem) {
    const tasksWrapper = document.createElement('div');
    const tasksTitle = document.createElement('h2');
    const tasksList = document.createElement('ul');

    if (sectionType === 'active') {
      items.forEach(({ title, tagtype, time, isActive, id }) => {
        if (isActive) {
          tasksList.append(
            Task({ title, tagtype, time, isActive, id }, deleteItem, finishItem)
          );
        }
      });
    } else {
      items.forEach(({ title, tagtype, time, isActive, id }) => {
        if (!isActive) {
          tasksList.append(
            Task({ title, tagtype, time, isActive, id }, deleteItem, finishItem)
          );
        }
      });
    }

    tasksWrapper.classList.add('task-section');
    tasksTitle.innerHTML = title;
    tasksWrapper.append(tasksTitle, tasksList);

    return tasksWrapper;
  }

  function Tasks(items, deleteItem, finishItem) {
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('tasks');
    const active = TasksSection(
      {
        title: 'All Tasks',
        items,
        sectionType: 'active',
      },
      deleteItem,
      finishItem
    );
    const finished = TasksSection(
      {
        title: 'Completed Tasks',
        items,
        sectionType: 'finished',
      },
      deleteItem,
      finishItem
    );
    tasksWrapper.append(active, finished);
    return tasksWrapper;
  }

  function Button({ text, onClick }) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.classList.add('btn');
    button.onclick = onClick;
    return button;
  }

  function Tag(type) {
    const span = document.createElement('span');
    const tag = document.createElement('label');
    const radio = document.createElement('input');
    tag.setAttribute('for', type);
    tag.innerHTML = type;
    tag.classList.add('tag', `tag--${type}`);
    span.classList.add('tag');
    radio.type = 'radio';
    radio.id = type;
    radio.name = 'tagtype';
    radio.value = type;
    span.append(radio, tag);
    return span;
  }

  function DatePicker() {
    const input = document.createElement('input');
    input.type = 'date';
    input.name = 'time';
    input.valueAsDate = new Date();
    input.classList.add('date-picker');
    return input;
  }

  function Tags() {
    const fieldset = document.createElement('fieldset');
    const tag_home = Tag('home');
    fieldset.name = 'tagtype';
    fieldset.required = true;
    const tag_health = Tag('health');
    const tag_work = Tag('work');
    const tag_other = Tag('other');
    tag_other.querySelector('input').checked = true;

    fieldset.append(tag_home, tag_work, tag_health, tag_other);
    return fieldset;
  }

  function Modal(addItem) {
    const overlay = document.createElement('div');
    const modal = document.createElement('form');
    const main = document.createElement('div');
    const title = document.createElement('h2');
    const input = Input('Task Title');
    const buttons = document.createElement('div');
    const btn_cancel = Button({ text: 'Cancel', onClick: modalCancel });
    const btn_add = Button({ text: 'Add Task' });
    const details = document.createElement('div');
    const tags = Tags();
    const datePicker = DatePicker();

    input.name = 'title';
    input.required = 'true';
    input.oninput = formValidation;
    overlay.classList.add('modal-overlay');
    modal.classList.add('modal');
    title.innerHTML = 'Add New Task';
    input.classList.add('input--modal');
    btn_cancel.classList.add('btn--modal-cancel');
    btn_add.classList.add('btn--modal-disabled');
    btn_add.id = 'btn_add';
    btn_add.type = 'submit';
    datePicker.required = true;

    buttons.classList.add('modal__buttons');
    details.classList.add('modal__details');
    tags.classList.add('tags');
    details.append(tags, datePicker);
    main.append(title, input, details);
    buttons.append(btn_cancel, btn_add);
    modal.append(main, buttons);
    overlay.append(modal);
    modal.id = 'addItemsModal';
    modal.onsubmit = addItem;

    return overlay;
  }

  /**
   * App container
   * @returns {HTMLDivElement} - The app container
   */
  async function App() {
    const [state, setItems] = await useState();
    async function deleteItem(e) {
      const id = parseInt(e.target.parentNode.id);
      await fetch(`http://localhost:3004/tasks/${id}`, {
        method: 'DELETE',
      });
    }

    async function addItem(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries([...formData]);
      data.isActive = true;
      await fetch('http://localhost:3004/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(data);
    }

    async function finishItem(e) {
      const id = parseInt(e.target.parentNode.id);
      const [task] = state.filter((item) => item.id === id);
      const { title, tagtype, time, isActive } = task;
      await fetch(`http://localhost:3004/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title,
          tagtype: tagtype,
          time: time,
          isActive: !isActive,
        }),
      });
      setItems();
    }

    async function searchItems(e) {
      if (timeout != null) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(async function () {
        const items = await getTasks();
        let value = e.target.value?.toLowerCase();
        searchValue = value;
        let foundItems = items.filter((item) =>
          item.title.toLowerCase().includes(value)
        );
        setItems(foundItems);
      }, 1500);
    }

    const div = document.createElement('div');
    div.classList.add('wrapper');
    const header = await Header('To Do List');
    const searchfield = SearchField(searchItems, searchValue);
    const modal = Modal(addItem);
    const tasks = Tasks(state, deleteItem, finishItem);

    div.append(header, searchfield, modal, tasks);
    return div;
  }

  /**
   * Render the app.
   * On change whole app is re-rendered.
   */
  async function renderApp() {
    const appContainer = document.getElementById('functional-example');
    appContainer.innerHTML = '';
    appContainer.append(await App());
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'denied') {
      localStorage.clear();
    }
  }

  // initial render
  renderApp();
})();
