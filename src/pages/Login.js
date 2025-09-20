import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { loginUser, getProfile } from '../utils/api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!validator.isEmail(value)) return 'Enter a valid email address';
        if (!value.endsWith('@gmail.com'))
          return 'Email must end with @gmail.com';
        return null;
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6)
          return 'Password must be at least 6 characters';
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

 const handleSubmit = async (ev) => {
  ev.preventDefault();

  // Validate fields
  const e = {
    email: validateField('email', email),
    password: validateField('password', password),
  };
  const filteredErrors = Object.fromEntries(
    Object.entries(e).filter(([k, v]) => v)
  );
  setErrors(filteredErrors);
  if (Object.keys(filteredErrors).length > 0) return;

  try {
    const loginRes = await loginUser(email, password);
    console.log("Login Response from backend:", loginRes); // ✅ add here
    const token = loginRes.token; // <- JWT from backend
    const user = loginRes.user;   // <- Employee object if backend provides

    if (!token) throw new Error('No token returned from login.');

    // Store token in localStorage for future requests
    localStorage.setItem('adminToken', token);

    // Fetch full profile using token
    const profile = await getProfile(user.id, token);
    localStorage.setItem('user', JSON.stringify(profile));

    // Redirect
    navigate('/dashboard');
  } catch (err) {
    console.error(err);
    setBackendError(
      err.response?.data?.message || 'Login failed. Please try again.'
    );
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login to INSURAI</h2>
        {backendError && (
          <div className="error backend-error">{backendError}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Company Email (e.g., name@gmail.com)"
              value={email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              value={password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="login-btn">
              Login
            </button>
            {/* <a className="forgot-link" href="#">
              Forgot password?
            </a> */}
          </div>
        </form>
      </div>
    </div>
  );
}
