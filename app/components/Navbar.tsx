import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <Link to="/resume">
        <p className="primary-button">Upload Resume</p>
      </Link>
    </nav>
  );
};

export default Navbar;
