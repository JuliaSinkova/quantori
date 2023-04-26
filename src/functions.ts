export function displayDate(date: string): string {
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
  const isCurrentYear = fullDate.getFullYear() === nowFullDate.getFullYear();

  if (isToday) {
    return "Today";
  }

  if (isTommorow) {
    return "Tomorrow";
  }

  if (isCurrentYear) {
    return fullDateString;
  }

  return fullDateStringWithYear;
}

export function formValidation(e: Event): void {
  const input = document.querySelector("#modal_input") as HTMLInputElement;
  const btn = document.querySelector("#btn_add") as HTMLButtonElement;
  const date = document.querySelector("#modal_date") as HTMLInputElement;
  if (input.value.trim() !== "" && date.value !== "") {
    btn.classList.remove("btn--modal-disabled");
    btn.classList.add("btn--modal-add");
    btn.disabled = false;
  } else {
    btn.classList.add("btn--modal-disabled");
    btn.disabled = true;
  }
}

export function openModal(): void {
  const modal = document.querySelector(".modal") as HTMLElement;
  const modal_overlay = document.querySelector(".modal-overlay") as HTMLElement;
  modal.style.display = "flex";
  modal_overlay.style.display = "block";
}
