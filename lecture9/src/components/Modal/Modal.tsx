import { Input } from "../Input/Input";
import { DatePicker } from "../DatePicker/DatePicker";
import { Tags } from "../Tags/Tags";
import { Button } from "../Button/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectModal,
  hideModal,
  setInputValid,
  setDatePickerValid,
} from "../../features/modal/modalSlice";
import {
  addTodo,
  clearCurrentEditTask,
  selectCurrentEditTask,
  updateTodo,
} from "../../features/todo/todoSlice";
import { addItemToDatabase, updateItemInDatabase } from "../../api/tasks";
import "./modal.css";

export function Modal({
  modalRef,
}: {
  modalRef: React.RefObject<HTMLFormElement>;
}) {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectModal);
  const currentEditTask = useAppSelector(selectCurrentEditTask);
  const title = currentEditTask ? "Edit your task" : "Add new task";
  const isModalOpen = modalState.isOpen;
  const inputValid = modalState.inputValid;
  const datepickerValid = modalState.datePickerValid;
  const addButtonClassName =
    inputValid && datepickerValid ? "btn--modal-add" : "btn--modal-disabled";
  const isAddButtonDisabled = inputValid && datepickerValid ? false : true;
  const overlayClassNames = `modal-overlay modal-overlay__${
    isModalOpen ? "open" : "closed"
  }`;
  const modalClassNames = `modal modal__${isModalOpen ? "open" : "closed"}`;

  const closeModal = (event?: React.MouseEvent) => {
    event?.preventDefault();
    modalRef.current?.reset();
    if (currentEditTask?.id) {
      dispatch(clearCurrentEditTask());
    }
    dispatch(setInputValid(false));
    dispatch(setDatePickerValid(true));
    dispatch(hideModal());
  };

  const saveItem = (event: React.FormEvent) => {
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

    if (currentEditTask?.id) {
      data.id = currentEditTask.id;
      dispatch(updateTodo(data));
      updateItemInDatabase(data);
    } else {
      data.id = Date.now();
      addItemToDatabase(data);
      dispatch(addTodo(data));
    }
    dispatch(clearCurrentEditTask());
    closeModal();
  };

  function onEnter(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  function InputValidation(event: React.KeyboardEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    if (value.trim() !== "") {
      dispatch(setInputValid(true));
    } else {
      dispatch(setInputValid(false));
    }
  }

  function DateValidation(event: React.ChangeEvent<HTMLInputElement>) {
    const value = (event.target as HTMLInputElement).value;
    if (value === "") {
      dispatch(setDatePickerValid(false));
    } else {
      dispatch(setDatePickerValid(true));
    }
  }

  return (
    <div className={overlayClassNames}>
      <form
        id="addItemsModal"
        className={modalClassNames}
        onSubmit={saveItem}
        onKeyDown={onEnter}
        ref={modalRef}
      >
        <h2>{title}</h2>
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
            text="Save Task"
            type="submit"
            className={addButtonClassName}
            isDisabled={isAddButtonDisabled}
          />
        </div>
      </form>
    </div>
  );
}
