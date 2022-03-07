import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useAuth from "../shared/hooks/useAuth";
import AuthContext from "../shared/contexts/authContext";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorModal from "../shared/ErrorModal";

import "./Menu.scss";

function Menu() {
  const navigate = useNavigate();
  const { loading, authError, logout, clearAuthError } = useAuth();
  const auth = useContext(AuthContext);

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (err) {}
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {authError && (
        <ErrorModal errorText={authError} closeErrorModal={clearAuthError} />
      )}
      <ol className="menu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>{!auth && <NavLink to="/auth">Login</NavLink>}</li>
        <li>{auth && <NavLink to="/my-library">My library</NavLink>}</li>
        <li>{auth && <NavLink to="/add-new-book">Add new book</NavLink>}</li>
        <li>{auth && <NavLink to="/borrow-book">Borrow book</NavLink>}</li>
        <li>{auth && <div onClick={handleLogout}>Logout</div>}</li>
      </ol>
    </>
  );
}

export default Menu;
