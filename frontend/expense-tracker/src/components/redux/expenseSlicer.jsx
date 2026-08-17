import { createSlice } from "@reduxjs/toolkit";
const expenseSlicer = createSlice({
  name: "exp",
  initialState: {
    items: [],
  },
  reducers: {
    makeexpenselist:(state,action)=>{
      state.items=action.payload
    },
    addExpense: (state, action) => {
        state.items.push(action.payload);
    },
    updateExpense: (state,action) => {
      var id=action.payload.expenseId;
      var exp=state.items.find(x=>x.expenseId==id);
      exp.amount=action.payload.amount;
      exp.description=action.payload.description;
      console.log(exp.amount);
    },
    deleteExpense: () => {},
  },
});
export const { addExpense, updateExpense, deleteExpense,makeexpenselist } =
  expenseSlicer.actions;
export default expenseSlicer.reducer;
