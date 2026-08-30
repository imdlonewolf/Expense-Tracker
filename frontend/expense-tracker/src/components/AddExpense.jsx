import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "./redux/expenseSlicer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const AddExpense = () => {
  const userId = useSelector((state) => state.expense.userId);
  const baseurl = useSelector((state) => state.expense.baseUrl);
  const navigate = useNavigate();
  const [newexpense, setnewexpense] = useState({
    amount: 0,
    description: "",
    categoryId: 1,
    userId: userId,
  });
  useEffect(() => {
    if (userId == 0) {
      console.log("trying to move it to login page");
      navigate("/login");
      return;
    }
  }, [userId, navigate]);
  const dispatch = useDispatch();
  const addtolist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseurl}Expense/AddExpense`,
        newexpense,
      );
      dispatch(addExpense(response.data));
      navigate("../");
    } catch (error) {
      console.log("Could not add", error);
      console.log(JSON.stringify(error.response.data.errors, null, 2));
    }
  };
  return (
    <main className="page-shell">
      <div className="brand-mark">ExpensePaglu</div>
      <section className="form-page">
        <p className="eyebrow">New entry</p>
        <h1>Add expense</h1>
        <p className="form-intro">
          Capture the details of a purchase so your spending stays clear.
        </p>
        <form
          className="surface form-card expense-form"
          action=""
          onSubmit={addtolist}
        >
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              name="amount"
              onChange={(e) =>
                setnewexpense({ ...newexpense, amount: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              name="description"
              onChange={(e) =>
                setnewexpense({ ...newexpense, description: e.target.value })
              }
            />
          </div>
          {/* <input
          type="number"
          name="category"
          onChange={(e) =>
            setnewexpense({ ...newexpense, category: e.target.value })
          }
        /> */}
          <button className="form-submit" type="submit">
            Save expense
          </button>
        </form>
      </section>
    </main>
  );
};
export default AddExpense;
