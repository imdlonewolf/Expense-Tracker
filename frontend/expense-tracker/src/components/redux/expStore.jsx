import { configureStore } from "@reduxjs/toolkit"; 
import exp from "./expenseSlicer"
const expStore=configureStore({
    reducer:{
        expense:exp,
    },
});
export default expStore;