import axios from "axios";
import { useEffect, useState } from "react";
import AddExpense from "./AddExpense";
import { Link, useNavigate } from "react-router-dom";
import { makeexpenselist, deleteExpense } from "./redux/expenseSlicer";
import { useDispatch, useSelector } from "react-redux";
const ExpenseList = () => {
  const Expense = useSelector((state) => state.expense.items);
  const userId = useSelector((state) => state.expense.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userId == 0) {
      console.log("trying to move it to login page");
      navigate("/login");
      return;
    }
    axios
      .get(`https://localhost:7273/Expense/GetAllExpenses/${userId}`)
      .then((response) => {
        dispatch(makeexpenselist(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId, dispatch,navigate]);
  const deletetheexpense = (id) => {
    axios
      .delete(`https://localhost:7273/Expense/DeleteExpense/${id}`)
      .then(() => {
        dispatch(deleteExpense(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (userId === 0) {
    return null;
  }
  return (
    <main className="page-shell">
      <div className="brand-mark">ExpensePaglu</div>
      <header className="page-header">
        <div>
          <p className="eyebrow">Personal finance</p>
          <h1>Expenses</h1>
        </div>
        <Link className="primary-action" to={`add`}>Add expense</Link>
      </header>
      {Expense.length ? (
        <div className="surface table-wrap">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Expense.map((x) => {
              return (
                <tr key={x.expenseId}>
                  <td>{x.expenseId}</td>
                  <td className="amount-cell">{x.amount}</td>
                  <td>{x.description}</td>
                  <td><span className="category-pill">Category {x.categoryId}</span></td>
                  <td className="actions">
                    <Link className="text-action" to={`details/${x.expenseId}`}>Details</Link>
                    <Link className="text-action" to={`update/${x.expenseId}`}>Update</Link>
                    <button onClick={() => deletetheexpense(x.expenseId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
        </div>
      ) : (
        <div className="surface empty-state">
          <h2>No expenses yet</h2>
          <p>Your recent spending will appear here once you add an expense.</p>
          <Link className="primary-action" to={`add`}>Add your first expense</Link>
        </div>
      )}
    </main>
  );
};
export default ExpenseList;
