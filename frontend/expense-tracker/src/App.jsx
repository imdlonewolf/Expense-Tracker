import { useState } from "react";
import AppRouter from "./components/AppRouter";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <AppRouter />
      {loading ? <Login setLoading={setLoading} /> : <ExpenseList />}
    </>
  );
}
export default App;
