import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const loc = useLocation();

  return (
    <header className="container">
      <nav className="navbar">
        <div className="brand">
          <div className="logo">INSURAI</div>
          <div className="small">Smarter Insurance</div>
        </div>
        <div className="navlinks">
          <Link className={`btn ${loc.pathname === "/" ? "btn-outline" : ""}`} to="/">Home</Link>

          {/* Employee links */}
          <Link className={`btn ${loc.pathname === "/login" ? "btn-primary" : ""}`} to="/login">Employee Login</Link>
          <Link className={`btn ${loc.pathname === "/signup" ? "btn-primary" : ""}`} to="/signup">Employee Signup</Link>

          {/* Admin links */}
          <Link className={`btn ${loc.pathname === "/admin/login" ? "btn-dark" : ""}`} to="/admin/login">Admin Login</Link>
          <Link className={`btn ${loc.pathname === "/admin/signup" ? "btn-warning" : ""}`} to="/admin/signup">Admin Signup</Link>
        </div>
      </nav>
    </header>
  );
}
