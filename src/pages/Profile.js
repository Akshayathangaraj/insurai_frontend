// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { updateProfile } from "../utils/api";
import axios from "axios";
import "./Profile.css"; // ✅ use new CSS

export default function Profile({ user }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    phone: "",
    age: "",
    profilePhotoUrl: "",
    address: "",
  });
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        department: user.department || "",
        role: user.role || "",
        phone: user.phone || "",
        age: user.age || "",
        profilePhotoUrl: user.profilePhotoUrl || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `/api/auth/${user.id}/uploadProfilePhoto`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const newUrl = res.data.profilePhotoUrl;
      setForm((prev) => ({ ...prev, profilePhotoUrl: newUrl }));
      setMessage("✅ Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const updated = await updateProfile(user.id, {
        profilePhotoUrl: form.profilePhotoUrl,
        address: form.address,
      });

      const newUser = { ...user, ...updated };
      localStorage.setItem("user", JSON.stringify(newUser));
      setForm({ ...form, ...updated });
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile. Try again.");
    }
  };

  const placeholderImg =
    "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";

  return (
    <div className="profile-page">
      {/* ---------------- Header ---------------- */}
      <header className="profile-header">
        <img
          src={form.profilePhotoUrl || placeholderImg}
          alt="Profile"
          className="profile-dp"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImg;
          }}
        />
        <div>
          <h2>{form.name}</h2>
          <p>{form.email}</p>
        </div>
      </header>

      <div className="profile-container">
        {/* ---------------- Profile Form ---------------- */}
        <section className="card">
          <h2>👤 My Profile</h2>
          {message && <p className="message">{message}</p>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div>
              <label>Full Name</label>
              <input name="name" value={form.name} disabled />
            </div>
            <div>
              <label>Email</label>
              <input name="email" value={form.email} disabled />
            </div>
            <div>
              <label>Department</label>
              <input name="department" value={form.department} disabled />
            </div>
            <div>
              <label>Role</label>
              <input name="role" value={form.role} disabled />
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} disabled />
            </div>
            <div>
              <label>Age</label>
              <input name="age" type="number" value={form.age} disabled />
            </div>

            <div>
              <label>Profile Photo</label>
              <input type="file" accept="image/*" onChange={handleFileUpload} />
              {uploading && <p>Uploading...</p>}
            </div>

            <div>
              <label>Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            <button type="submit" disabled={uploading} className="primary-btn">
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
