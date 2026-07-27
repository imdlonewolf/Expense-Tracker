import { Route, Router, Routes } from "react-router-dom";
import EmployeeList from "./ExpenseList";
import DetailsExpense from "./DetailsExpense";
import UpdateExpense from "./UpdateExpense";
import AddExpense from "./AddExpense";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/add" element={<AddExpense />}/>
      <Route path="/details/:id" element={<DetailsExpense/>}/>
      <Route path="/update/:id" element={<UpdateExpense/>}/>
    </Routes>
  );
};
export default AppRouter;
