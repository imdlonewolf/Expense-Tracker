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
    <div>
      {Expense.length ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {Expense.map((x) => {
              return (
                <tr key={x.expenseId}>
                  <td>{x.expenseId}</td>
                  <td>{x.amount}</td>
                  <td>{x.description}</td>
                  <td>{x.categoryId}</td>
                  <td>
                    <Link to={`details/${x.expenseId}`}>Details</Link>
                  </td>
                  <td>
                    <Link to={`update/${x.expenseId}`}>Update</Link>
                  </td>
                  <td>
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
      ) : (
        "No expenses Found"
      )}
      <div></div>
      <Link to={`add`}>Add New Expense</Link>
      <div></div>
      {/* <Link to={`/`}>Back</Link> */}
    </div>
  );
};
export default ExpenseList;
