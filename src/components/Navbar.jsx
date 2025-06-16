import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <h2>📝 SocialApp</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create Post</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
