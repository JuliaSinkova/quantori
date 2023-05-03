import { Input } from "../Input/Input";
import { DatePicker } from "../DatePicker/DatePicker";
import { Tags } from "../Tags/Tags";
import { Button } from "../Button/Button";

import { TaskInterface } from "../Task/TaskInterface";
import { useState, useRef } from "react";
import { addItemToDatabase } from "../../api/tasks";
import "./modal.css";


export function Modal({ modalState, setModalState, todos, setTodos }: {
  modalState: string;
  setModalState: React.Dispatch<string>;
  todos: TaskInterface[];
  setTodos: React.Dispatch<TaskInterface[]>;
}) {
  
  const [inputValid, setInputValid] = useState(false);
  const [datepickerValid, setDatepickerValid] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const addButtonClassName =
    inputValid && datepickerValid ? "btn--modal-add" : "btn--modal-disabled";
  const isAddButtonDisabled = inputValid && datepickerValid ? false : true;
  const overlayClassNames = `modal-overlay modal-overlay__${modalState}`;
  const modalClassNames = `modal modal__${modalState}`;

  const closeModal = (event?: React.MouseEvent) => {
    event?.preventDefault();
    formRef.current?.reset();
    setInputValid(false);
    setDatepickerValid(true);
    setModalState("closed");
  };



  const addItem = (event: React.FormEvent) => {
    interface RequestData {
      title: string;
      tagtype: string;
      date: string;
    }
    event.preventDefault();
    console.log(event);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form) as unknown as Iterable<
      [RequestData, FormDataEntryValue]
    >;
    const data = Object.fromEntries(formData);
    data.isActive = true;
    data.id = Date.now();
    addItemToDatabase(data);
    setTodos([...todos, data]);
    closeModal();
  };
  function onEnter (event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  function InputValidation(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim() !== "") {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }

  function DateValidation(event: React.ChangeEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    if (value === "") {
      setDatepickerValid(false);
    } else {
      setDatepickerValid(true);
    }
  }

  return (
    <div className={overlayClassNames}>
      <form
        id="addItemsModal"
        className={modalClassNames}
        onSubmit={addItem}
        onKeyDown={onEnter}
        ref={formRef}
      >
        <h2>Add New Task</h2>
        <Input
          name="title"
          placeholder="Task Title"
          id="modal_input"
          className="input--modal"
          onKeyUp={InputValidation}
        />
        <div className="modal__details">
          <Tags />
          <DatePicker onChange={DateValidation} />
        </div>
        <div className="modal__buttons">
          <Button
            text="Cancel"
            className="btn--modal-cancel"
            onClick={closeModal}
          />
          <Button
            text="Add Task"
            type="submit"
            className={addButtonClassName}
            isDisabled={isAddButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
}
