import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login";
const ProtectedRoute = () => {
    
  const userId = useSelector((state) => state.expense.userId);
  const token = useSelector((state) => state.expense.token);
  // console.log(token);
  // console.log(userId);
  const isauthenticated = userId !== 0 && token !== "";
  return isauthenticated ? <Outlet /> : <Login />;
};
export default ProtectedRoute;
