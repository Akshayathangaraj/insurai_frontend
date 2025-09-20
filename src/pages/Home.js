// src/pages/Home.js
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      navigate("/dashboard");
    } else if (adminToken) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      {/* ✅ Reusable Navbar */}
      {/* <Navbar /> */}

      {/* ✅ Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Welcome to <span className="highlight">INSURAI</span>
          </h1>
          <p className="tagline">
            Smarter insurance solutions for teams and employees — secure, modern, and reliable.
          </p>

          <div className="features">
            <div className="feature">✔ Employee Management</div>
            <div className="feature">✔ Policy Tracking</div>
            <div className="feature">✔ Claims Dashboard</div>
            <div className="feature">✔ Admin & Employee Portals</div>
          </div>

          <p className="internship-note">
            <em>Developed as part of Infosys Virtual Internship 6.0</em>
          </p>
        </div>

        <div className="hero-right card">
          <h3>Get Started</h3>
          <p>
            Choose your role to access tailored dashboards with secure login and
            smooth navigation.
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="btn primary">Employee</Link>
            <Link to="/admin/login" className="btn secondary">Admin</Link>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="footer">
        <p>© 2025 Insurai — All rights reserved.</p>
      </footer>
    </div>
  );
}
