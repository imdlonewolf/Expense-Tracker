import { createSlice } from "@reduxjs/toolkit";

const expenseSlicer=createSlice({
    name:"exp",
    initialState:{
        items:[],
    },
    reducers:{
        addExpense:()=>{

        },
        updateExpense:()=>{

        },
        deleteExpense:()=>{

        }
    },
});
export const {addExpense,updateExpense,deleteExpense}=expenseSlicer.actions;
export default expenseSlicer.reducer;