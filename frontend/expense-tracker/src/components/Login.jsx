import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/expenseSlicer";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const baseurl=useSelector((state) => state.expense.baseUrl);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [User, SetUser] = useState({
    Name:"",
    Phone: "",
    Password: "",
  });
  const loginvalidation = (e) => {
    e.preventDefault();
    axios.post(`${baseurl}User/Login`, User)
    .then((response) => {
        // setLoading(false);
        // setuserId(response.data);
        var token=response.data;
        const decoded = jwtDecode(token);
        const id=decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        dispatch(login(id));
        navigate("/");
      })
    .catch((error) => {
      navigate("/Error");
    });
  };
  return (
    <main className="page-shell">
      <section className="auth-page">
        <div className="brand-mark">ExpensePaglu</div>
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in</h1>
        <p className="form-intro">Pick up your spending story where you left off.</p>
        <form className="surface form-card expense-form" action="" onSubmit={loginvalidation}>
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
          <button className="form-submit" type="submit">Sign in</button>
        </form>
      </section>
    </main>
  );
};
export default Login;
