import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from "../../images/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid mx-5">
        <Link to="/" className="navbar-brand">
          <img 
            className="img-fluid w-28" 
            src={logo} 
            alt="" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mx-5">
            <li className="nav-item mx-4">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item mx-4">
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className="nav-item mx-4">
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
            <li className="nav-item mx-4">
              <Link to="/users" className="nav-link">Users</Link>
            </li>
            <li className="nav-item mx-4">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
