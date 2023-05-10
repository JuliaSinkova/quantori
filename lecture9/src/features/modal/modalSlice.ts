import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
  isOpen: false,
  inputValid: false,
  datePickerValid: true,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    hideModal: (state) => {
      state.isOpen = false;
    },
    showModal: (state) => {
      state.isOpen = true;
    },
    setInputValid: (state, action: PayloadAction<boolean>) => {
      state.inputValid = action.payload;
    },
    setDatePickerValid: (state, action: PayloadAction<boolean>) => {
      state.datePickerValid = action.payload;
    },
  },
});

export const { showModal, hideModal, setDatePickerValid, setInputValid } =
  modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;
