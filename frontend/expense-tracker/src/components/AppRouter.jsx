import { Route, Router, Routes } from "react-router-dom";
import DetailsExpense from "./DetailsExpense";
import UpdateExpense from "./UpdateExpense";
import AddExpense from "./AddExpense";
import Login from "./Login";
import ExpenseList from "./ExpenseList";
// import PleaseLogin from "./PleaseLogin";
import ErrorPage from "./ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/details/:id" element={<DetailsExpense />} />
        <Route path="/update/:id" element={<UpdateExpense />} />
      </Route>
    </Routes>
  );
};
export default AppRouter;
