import './input.css';
export function Input(placeholder: string) {
    const input = document.createElement('input');
    input.placeholder = placeholder;
    input.classList.add('input');
    return input;
  }