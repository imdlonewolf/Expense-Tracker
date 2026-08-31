import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailsexpense } from "./redux/expenseSlicer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DetailsExpense = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.expense.userId);
  const ex = useSelector((state) =>
    state.expense.items.find((item) => item.expenseId == params.id),
  );
  useEffect(() => {
    if (userId == 0) {
      navigate("/pleaselogin");
      return;
    }
  }, [userId, navigate]);
  if (userId == 0) {
    return null;
  }
  return (
    <main className="page-shell">
      <div className="brand-mark">ExpensePaglu</div>
      <section className="detail-page">
        <p className="eyebrow">Expense details</p>
        <h1>Transaction</h1>
        <div className="surface form-card">
          <table className="detail-table">
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
            <tr>
              <td>{ex.amount}</td>
              <td>{ex.description}</td>
              <td>{ex.categoryId}</td>
            </tr>
          </table>
        </div>
        <Link className="back-link" to={`/`}>
          Back to expenses
        </Link>
      </section>
    </main>
  );
};
export default DetailsExpense;
