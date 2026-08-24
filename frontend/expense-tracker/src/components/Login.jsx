import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/expenseSlicer";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ setLoading,setuserId }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [User, SetUser] = useState({
    Name:"",
    Phone: "",
    Password: "",
  });
  const loginvalidation = (e) => {
    e.preventDefault();
    axios.post("https://localhost:7273/User/Login", User)
    .then((response) => {
        // setLoading(false);
        // setuserId(response.data);
        dispatch(login(response.data));
        navigate("/");
      })
    .catch((error) => {
      console.log(error);
    });
  };
  return (
    <div>
      <form action="" onSubmit={loginvalidation}>
        <input
          type="text"
          name="phone"
          onChange={(e) => SetUser({ ...User, Phone: e.target.value })}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => SetUser({ ...User, Password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
