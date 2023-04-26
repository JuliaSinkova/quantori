import "./tag.css";

export function Tag(type: string) {
  const span = document.createElement("span");
  span.classList.add("tag");

  const tag = document.createElement("label");
  tag.setAttribute("for", type);
  tag.innerHTML = type;
  tag.classList.add("tag", `tag--${type}`);
  tag.onclick = () => {
    radio.checked = true;
  };

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.id = type;
  radio.name = "tagtype";
  radio.value = type;

  span.append(radio, tag);
  return span;
}
