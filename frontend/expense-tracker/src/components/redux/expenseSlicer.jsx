import { createSlice } from "@reduxjs/toolkit";
const expenseSlicer = createSlice({
  name: "exp",
  initialState: {
    items: [],
  },
  reducers: {
    addExpense: (state, action) => {
        state.items.push(action.payload);
    },
    updateExpense: (state,action) => {
      state.items.push(action.payload);
    },
    deleteExpense: () => {},
  },
});
export const { addExpense, updateExpense, deleteExpense } =
  expenseSlicer.actions;
export default expenseSlicer.reducer;
