import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const expenseSlicer = createSlice({
  name: "exp",
  initialState: {
    items: [],
    token: "",
    userId: 0,
    baseUrl: "https://localhost:7273/",
    // baseUrl: "https://expensepaglu-api.runasp.net/"
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      state.userId = jwtDecode(state.token)[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    },
    makeexpenselist: (state, action) => {
      state.items = action.payload;
    },
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
    updateExpense: (state, action) => {
      var id = action.payload.expenseId;
      var exp = state.items.find((x) => x.expenseId == id);
      exp.amount = action.payload.amount;
      exp.description = action.payload.description;
      // console.log(exp.amount);
    },
    deleteExpense: (state, action) => {
      var id = action.payload;
      state.items = state.items.filter((x) => x.expenseId != id);
    },
  },
});
export const {
  addExpense,
  updateExpense,
  deleteExpense,
  makeexpenselist,
  detailsexpense,
  login,
} = expenseSlicer.actions;
export default expenseSlicer.reducer;
