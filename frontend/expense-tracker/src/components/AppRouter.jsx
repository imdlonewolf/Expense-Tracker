import { Route, Router, Routes } from "react-router-dom";
import DetailsExpense from "./DetailsExpense";
import UpdateExpense from "./UpdateExpense";
import AddExpense from "./AddExpense";
import Login from "./Login";
import ExpenseList from "./ExpenseList";
import PleaseLogin from "./PleaseLogin";
import ErrorPage from "./ErrorPage";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ExpenseList/>}/>
      <Route path="/add" element={<AddExpense />}/>
      <Route path="/error" element={<ErrorPage/>}/>
      <Route path="/pleaselogin" element={<PleaseLogin />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/details/:id" element={<DetailsExpense/>}/>
      <Route path="/update/:id" element={<UpdateExpense/>}/>
    </Routes>
  );
};
export default AppRouter;
