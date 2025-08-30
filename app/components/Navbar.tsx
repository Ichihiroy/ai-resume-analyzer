import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="group">
        <p className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
          Resume Pulse
        </p>
      </Link>
      <Link to="/upload">
        <p className="primary-button">Upload Resume</p>
      </Link>
    </nav>
  );
};

export default Navbar;
