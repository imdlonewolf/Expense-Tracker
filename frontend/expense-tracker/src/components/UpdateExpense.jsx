import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateExpense } from "./redux/expenseSlicer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
const UpdateExpense = () => {
  const baseurl = useSelector((state) => state.expense.baseUrl);
  const params = useParams();
  const userId = useSelector((state) => state.expense.userId);
  const token = useSelector((state) => state.expense.token);
  const expense=useSelector((state) => state.expense.items.find((item) => item.expenseId === Number(params.id)));
  const categories = useSelector((state) => state.expense.categories);
  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [newexpense, setnewexpense] = useState({
    expenseId: Number(params.id),
    amount: expense?.amount || 0,
    description: expense?.description || "",
    categoryId: expense?.categoryId ||   1,
    categoryName: expense?.categoryName || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updatetolist = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseurl}Expense/UpdateExpense`,
        newexpense,
        authConfig,
      );
      dispatch(updateExpense(newexpense));
      navigate("../");
    } catch (error) {
      navigate("/error");
      // console.log("Could not add", error);
      // console.log(JSON.stringify(error.response.data.errors, null, 2));
    }
  };
  if (userId === 0) {
    return null;
  }
  return (
    <main className="page-shell">
      <div className="brand-mark">ExpensePaglu</div>
      <section className="form-page">
        {console.log(newexpense)}
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
              value={newexpense.amount}
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
              value={newexpense.description}
              onChange={(e) =>
                setnewexpense({ ...newexpense, description: e.target.value })
              }
            />
          </div>
          <div className="field">
            <label htmlFor="categoryId">Category</label>
            <select
              value={newexpense.categoryId}
              onChange={(e) =>
                setnewexpense({ ...newexpense, categoryId: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <button className="form-submit" type="submit">
            Save changes
          </button>
        </form>
      </section>
    </main>
  );
};
export default UpdateExpense;
