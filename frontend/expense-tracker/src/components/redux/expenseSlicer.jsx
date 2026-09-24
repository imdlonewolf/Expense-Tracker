import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const expenseSlicer = createSlice({
  name: "exp",
  initialState: {
    items: [],
    categories: [],
    token: "",
    userId: 0,
    baseUrl: "https://localhost:7273/",
    // baseUrl: "https://expensepaglu-api.runasp.net/"
    hasLoadedExpenses: false,
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
      state.hasLoadedExpenses = true;
    },
    getcategories: (state, action) => {
      state.categories = action.payload;
    },
    addExpense: (state, action) => {
      var exp=action.payload;
      var cat=state.categories.find((x)=>x.categoryId==exp.categoryId);
      exp.categoryName=cat.categoryName;
      state.items.push(action.payload);
    },
    updateExpense: (state, action) => {
      var id = action.payload.expenseId;
      var exp = state.items.find((x) => x.expenseId == id);
      exp.categoryName=state.categories.find((x)=>x.categoryId==action.payload.categoryId).categoryName;
      exp.amount = action.payload.amount;
      exp.description = action.payload.description;
      // console.log(exp.categoryName);
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
  getcategories,
  detailsexpense,
  login,
} = expenseSlicer.actions;
export default expenseSlicer.reducer;
