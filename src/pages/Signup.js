import React, { useState } from "react";
import { signupUser } from "../utils/api";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
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
        if (!/^[6-9]\d{9}$/.test(value))
          return "Enter a valid 10-digit phone number starting with 6-9";
        return null;
      case "age":
        if (!value) return "Age is required";
        if (parseInt(value) < 18) return "Age must be at least 18";
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
      const { confirmPassword, ...signupData } = form;
       // ensure number
      signupData.age = signupData.age ? parseInt(signupData.age) : 18; // fallback default

      const res = await signupUser(signupData);

      // ✅ Backend now returns { message: "...", employee: {...} }
      setSuccess(res.message || "Signup successful!");
      setBackendError("");

      setForm({
        name: "",
        department: "",
        role: "",
        email: "",
        phone: "",
        age: "",
        profilePhotoUrl: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      // ✅ show backend's error message
      setBackendError(err.response?.data?.message || "Signup failed. Try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="signup-title">Create Your Account</h2>
        {success && <div className="success-msg">{success}</div>}
        {backendError && <div className="error backend-error">{backendError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
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
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
            />
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Company Email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
