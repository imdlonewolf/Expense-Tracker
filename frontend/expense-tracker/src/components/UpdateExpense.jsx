import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "./redux/expenseSlicer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
const UpdateExpense = () => {
  const baseurl = useSelector((state) => state.expense.baseUrl);
  const params = useParams();
  const userId = useSelector((state) => state.expense.userId);
  const [newexpense, setnewexpense] = useState({
    expenseId: Number(params.id),
    amount: 0,
    description: "",
    categoryId: 1,
    userId: userId,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
    useEffect(() => {
    if (userId == 0) {
      console.log("trying to move it to login page");
      navigate("/login");
      return;
    }
  }, [userId, navigate]);
  const updatetolist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseurl}Expense/UpdateExpense`,
        newexpense,
      );
      dispatch(updateExpense(newexpense));
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
        <p className="eyebrow">Edit entry</p>
        <h1>Update expense</h1>
        <p className="form-intro">
          Keep the details accurate so your spending history stays useful.
        </p>
        <form
          className="surface form-card expense-form"
          action=""
          onSubmit={updatetolist}
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
            Save changes
          </button>
        </form>
      </section>
    </main>
  );
};
export default UpdateExpense;
