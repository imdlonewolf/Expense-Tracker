import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DetailsExpense = () => {
  const [Expense, SetExpense] = useState({
    amount: 0,
    description: "",
    categoryId: 1,
  });
  const params=useParams()
  const  navigate=useNavigate()
  useEffect(() => {
    axios
      .get(`https://localhost:7273/Expense/GetExpense/${params.id}`)
      .then((response) => {
        console.log(response.data);
        SetExpense(response.data);
        // navigate("../");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <form action="">
        <input type="text" value={Expense.amount} />
        <input type="text" value={Expense.description} />
        <input type="text" value={Expense.categoryId} />
      </form>
    </div>
  );
};
export default DetailsExpense;
