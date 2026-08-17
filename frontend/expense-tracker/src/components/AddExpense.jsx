import { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "./redux/expenseSlicer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddExpense = () => {
  const [newexpense, setnewexpense] = useState({
    amount: 0,
    description: "",
    categoryId: 1,
    userId: 2,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addtolist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7273/Expense/AddExpense",
        newexpense,
      );
      dispatch(addExpense(response.data));
      // navigate("../");
    } catch (error) {
      console.log("Could not add", error);
      console.log(JSON.stringify(error.response.data.errors, null, 2));
    }
  };
  return (
    <div>
      <form action="" onSubmit={addtolist}>
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
export default AddExpense;
