import React, { useState } from "react";
import { signupUser } from "../utils/api";
import validator from "validator";
import "./Signup.css"; // Make sure this CSS file exists

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // real-time validation per field
    setErrors((prev) => ({ ...prev, [e.target.name]: validateField(e.target.name, e.target.value) }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        return null;
      case "department":
        if (!value.trim()) return "Department is required";
        return null;
      case "role":
        if (!value.trim()) return "Role is required";
        return null;
      case "email":
        if (!validator.isEmail(value)) return "Enter a valid email";
        if (!value.endsWith("@gmail.com")) return "Email must end with @gmail.com";
        return null;
      case "phone":
        if (!/^[6-9]\d{9}$/.test(value)) return "Enter a valid 10-digit phone number starting with 6-9";
        return null;
      case "password":
        if (value.length < 6) return "Password must be at least 6 characters";
        return null;
      case "confirmPassword":
        if (value !== form.password) return "Passwords do not match";
        return null;
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log("Signup data:", form);
      // await signupUser(form); // Uncomment when backend is ready
      setSuccess("Signup successful! (Backend integration pending)");
      setForm({
        name: "",
        department: "",
        role: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setSuccess("");
      alert("Signup failed. Try again later.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <select name="department" value={form.department} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.department && <span className="error">{errors.department}</span>}
          </div>

          <div className="form-group">
            <input type="text" name="role" placeholder="Role" value={form.role} onChange={handleChange} />
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <input type="email" name="email" placeholder="Company Email (@gmail.com for now)" value={form.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
