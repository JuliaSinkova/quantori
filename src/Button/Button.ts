import './button.css';

type funcWithEvent = (event: Event) => Promise<void>;
type funcWithoutEvent = () => void;
type something = funcWithEvent | funcWithoutEvent;

export function Button(
  text: string,
  onClick?: something
): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.classList.add("btn");
  button.onclick = onClick;
  return button;
}
