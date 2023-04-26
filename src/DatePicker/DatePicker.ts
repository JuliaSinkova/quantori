 import './datePicker.css';
 
   export  function DatePicker() {
        const input = document.createElement('input');
        input.type = 'date';
        input.name = 'time';
        input.valueAsDate = new Date();
        input.classList.add('date-picker');
        return input;
      }