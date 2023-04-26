import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import {formValidation } from "../functions";
import { Tags } from "../Tags/Tags";
import { DatePicker } from "../DatePicker/DatePicker";
import "./modal.css";

export function Modal(addItem: (event: Event) => Promise<void>, modalCancel: () => void) {
  const title = document.createElement("h2");
  title.innerHTML = "Add New Task";

  const input = Input("Task Title");
  input.name = "title";
  input.required = true;
  input.oninput = formValidation;
  input.classList.add("input--modal");
  input.id = "modal_input";

  const btn_cancel = Button("Cancel", modalCancel);
  btn_cancel.classList.add("btn--modal-cancel");
  btn_cancel.type = "reset";

  const btn_add = Button("Add Task");
  btn_add.classList.add("btn--modal-disabled");
  btn_add.id = "btn_add";
  btn_add.type = "submit";

  const buttons = document.createElement("div");
  buttons.classList.add("modal__buttons");
  buttons.append(btn_cancel, btn_add);

  const tags = Tags();
  tags.classList.add("tags");

  const datePicker = DatePicker();
  datePicker.id = "modal_date";

  const details = document.createElement("div");
  details.classList.add("modal__details");
  details.append(tags, datePicker);
  datePicker.required = true;

  const main = document.createElement("div");
  main.append(title, input, details);

  const modal = document.createElement("form");
  modal.id = "addItemsModal";
  modal.onsubmit = addItem;
  modal.onchange = formValidation;
  modal.classList.add("modal");
  modal.append(main, buttons);

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");
  overlay.append(modal);

  return overlay;
}
