import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { TaskInterface } from "../../components/Task/TaskInterface";

export interface TodoState {
  tasks: TaskInterface[];
  currentEditTask: TaskInterface | null;
}

const initialState: TodoState = { tasks: [], currentEditTask: null };
const baseUrl = "http://localhost:3004";

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch(`${baseUrl}/tasks`);
  const data = await response.json();
  return data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<TaskInterface[]>) => {
      state.tasks = action.payload;
    },
    setCurrentEditTask: (state, action: PayloadAction<TaskInterface>) => {
      state.currentEditTask = action.payload || null;
    },
    clearCurrentEditTask: (state) => {
      state.currentEditTask = null;
    },
    addTodo: (state, action: PayloadAction<TaskInterface>) => {
      state.tasks.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((todo) => todo.id !== action.payload);
    },
    finishTodo: (state, action: PayloadAction<TaskInterface>) => {
      const index = state.tasks.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.tasks[index] = action.payload;
    },
    updateTodo: (state, action: PayloadAction<TaskInterface>) => {
      const index = state.tasks.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.tasks[index] = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const {
  addTodo,
  deleteTodo,
  updateTodo,
  finishTodo,
  setTodo,
  setCurrentEditTask,
  clearCurrentEditTask,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todo.tasks;

export const selectCurrentEditTask = (state: RootState) =>
  state.todo.currentEditTask;

export default todoSlice.reducer;
