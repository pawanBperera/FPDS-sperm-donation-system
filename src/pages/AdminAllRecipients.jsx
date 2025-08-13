// File: src/pages/AdminAllRecipients.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
//import "./AdminAllRecipients.css"; // optional if you wanna do custom styling
import axios from "axios"; 


// ─── Axios defaults ────────────────────────────────────────────
axios.defaults.baseURL = "http://localhost:8080";
const stored = localStorage.getItem("user");
if (stored) {
  const { token } = JSON.parse(stored);
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// ─────────────────────────────────────────────────────────────────



export default function AdminAllRecipients() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
  const fetchDonors = async () => {
    try {
      const res = await axios.get("/api/admin/users/recipients");
       console.log("Donors payload:", res.data); 
      setRecipients(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    }finally {
      setLoading(false);
    }
  };

  fetchDonors();
}, []);




  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this recipient?")) {
      setRecipients((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="recipient-page-container">
      <h2 className="text-center my-4 fw-bold">All Recipients</h2>

 {loading ? (
      <p className="text-center">Loading donors...</p>
    ) : (
      <>
        {/* Table */}
        <div className="text-center mt-4">
        <button className="btn" style={{ backgroundColor: "#f79bd3" }} onClick={() => navigate("/admin/dashboard")}> 
          <FaHome className="me-2" /> Dashboard
        </button>
      </div> <br></br>
        
      <div className="table-responsive d-flex justify-content-center">
        <table className="table table-bordered text-center" style={{ maxWidth: "800px", backgroundColor: "#fce6ff" }}>
          <thead>
            <tr>
              <th>Recipient ID</th>
              <th>Email</th>
              <th>Age</th>
              <th>Shortlisted Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((r, index) => (
  <tr key={`${r.userId}-${index}`}>
                <td>{r.user_id}</td>
<td>{r.email}</td>
<td>{r.age}</td>
<td>{r.shortlisted_count}</td>


                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(r.userId)}
                  >
                    Remove The Recipient
                  </button>


                </td>
              </tr>
            ))}
            {recipients.length === 0 && (
              <tr>
                <td colSpan="5">No recipients available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      
      </>
        )}
    </div>
  );
}
