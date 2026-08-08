import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "./redux/expenseSlicer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const UpdateExpense = () => {
  const params = useParams();
  const [newexpense, setnewexpense] = useState({
    expenseId: Number(params.id),
    amount: 0,
    description: "",
    categoryId: 1,
    userId: 2,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatetolist = (e) => {
    e.preventDefault();
    try {
      const response = axios.put(
        "https://localhost:7273/Expense/UpdateExpense",
        newexpense,
      );
      dispatch(updateExpense(response.data));
      navigate("../");
    } catch (error) {
      console.log("Could not add", error);
      console.log(JSON.stringify(error.response.data.errors, null, 2));
    }
  };
  return (
    <div>
      <form action="" onSubmit={updatetolist}>
        <input
          type="number"
          name="amount"
          onChange={(e) =>
            setnewexpense({ ...newexpense, amount: e.target.value })
          }
        />
        <input
          type="text"
          name="description"
          onChange={(e) =>
            setnewexpense({ ...newexpense, description: e.target.value })
          }
        />
        {/* <input
          type="number"
          name="category"
          onChange={(e) =>
            setnewexpense({ ...newexpense, category: e.target.value })
          }
        /> */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default UpdateExpense;
