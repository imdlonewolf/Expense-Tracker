import axios from "axios";
import { useState } from "react";

const Login = ({ setLoading,setuserId }) => {
  const [User, SetUser] = useState({
    Name:"",
    Phone: "",
    Password: "",
  });
  const loginvalidation = (e) => {
    e.preventDefault();
    axios.post("https://localhost:7273/User/Login", User)
    .then((response) => {
        setLoading(false);
        setuserId(response.data);
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
          name="amount"
          onChange={(e) => SetUser({ ...User, Phone: e.target.value })}
        />
        <input
          type="text"
          name="description"
          onChange={(e) => SetUser({ ...User, Password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
