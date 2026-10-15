import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SignUp = () => {
  const baseurl = useSelector((state) => state.expense.baseUrl);
  const navigate = useNavigate();

  const [User, SetUser] = useState({
    Name: "",
    Phone: "",
    Password: "",
  });
  const createuser = (e) => {
    e.preventDefault();
    axios
      .post(`${baseurl}User/SignUp`, User)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };
  return (
    <main className="page-shell">
      <section className="auth-page">
        <div className="brand-mark">ExpensePaglu</div>
        <p className="eyebrow">Welcome to ExpensePaglu!</p>
        <h1>Sign Up</h1>
        <p className="form-intro">
          Welcome to ExpensePaglu! Please fill in the details below to create
          your account.
        </p>
        <form
          className="surface form-card expense-form"
          action=""
          onSubmit={createuser}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              onChange={(e) => SetUser({ ...User, Name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="text"
              name="phone"
              onChange={(e) => SetUser({ ...User, Phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={(e) => SetUser({ ...User, Password: e.target.value })}
            />
          </div>
          <button className="form-submit" type="submit">
            Sign Up
          </button>
        </form>
      </section>
    </main>
  );
};
export default SignUp;
