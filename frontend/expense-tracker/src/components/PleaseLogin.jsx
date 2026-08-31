import { Link } from "react-router-dom";
const PleaseLogin=() => {
    return (
      <div className="surface form-card">
        Please Login to go Ahead 😁 
        <div>
          <Link className="primary-action" to={`/login`}>
            Login
          </Link>
        </div>
      </div>
    );
}
export default PleaseLogin;