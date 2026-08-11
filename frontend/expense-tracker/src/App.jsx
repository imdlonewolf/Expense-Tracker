import { useState } from "react";
import AppRouter from "./components/AppRouter";
import ExpenseList from "./components/ExpenseList";
import Login from "./components/Login";

function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setuserId] = useState(0);
  return (
    <>
      <AppRouter />
      {loading ? (
        <Login setLoading={setLoading} setuserId={setuserId} />
      ) : (
        <ExpenseList userId={userId}/>
      )}
      {/* {userId} */}
    </>
  );
}
export default App;
