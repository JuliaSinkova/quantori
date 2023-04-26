import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { openModal } from "../functions";
import './searchfield.css';

export function SearchField(
  searchFunction: (e: Event) => Promise<void>,
  inputValue: string
) {
  const div = document.createElement("div");
  div.classList.add("searchfield");

  const input = Input("Search text");
  input.onkeyup = searchFunction;
  input.id = "search";
  input.value = inputValue;

  const button = Button("+ New Task", openModal);
  button.classList.add("btn--new");
  div.append(input, button);
  
  return div;
}
